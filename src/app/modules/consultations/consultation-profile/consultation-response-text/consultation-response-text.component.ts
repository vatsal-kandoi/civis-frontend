import { Component, OnInit, Input, ViewEncapsulation, ViewChild, ElementRef, Output, EventEmitter, AfterViewChecked } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { ConsultationsService } from 'src/app/shared/services/consultations.service';
import { filter, map } from 'rxjs/operators';
import { isObjectEmpty } from 'src/app/shared/functions/modular.functions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consultation-response-text',
  templateUrl: './consultation-response-text.component.html',
  styleUrls: ['./consultation-response-text.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ConsultationResponseTextComponent implements OnInit, AfterViewChecked {
  @Input() profileData;
  @ViewChild('responseIndex', { read: ElementRef, static: false }) responseIndex: ElementRef<any>;
  @ViewChild('responseContainer', { read: ElementRef, static: false }) responseContainer: ElementRef<any>;
  @Output() openFeedbackModal: EventEmitter<any> = new EventEmitter();



  ckeConfig =  {
    removePlugins: 'elementspath',
    resize_enabled: false,
   };
  currentUser: any;
  consultationId: any;
  responseText: any;
  showPublicResponseOption: boolean;
  showAutoSaved: boolean;
  templateText: any;
  templateId: any;
  usingTemplate: boolean;
  responseVisibility: any;
  responseSubmitLoading: boolean;
  customStyleAdded: any;

  constructor(
    private userService: UserService,
    private consultationService: ConsultationsService,
    private router: Router) {
      this.consultationService.consultationId$
      .pipe(
        filter(i => i !== null)
      )
      .subscribe((consulationId: any) => {
        this.consultationId = consulationId;
      });
   }

  ngOnInit(): void {
    this.getCurrentUser();
    this.subscribeUseTheResponseText();
    this.getResponseText();
    this.scrollToCreateResponse();
    this.createSatisfactionRating();
  }

  ngAfterViewChecked() {
    this.editIframe();
  }

  createSatisfactionRating() {
    this.consultationService.openFeedbackModal
    .subscribe((status) => {
      if (status) {
        this.openFeedbackRatingModal();
      }
    });
  }

  openFeedbackRatingModal() {
    if (this.currentUser) {
      if (this.responseText) {
        const consultationResposne = this.getConsultationResponse();
        if (!isObjectEmpty(consultationResposne)) {
          this.openFeedbackModal.emit(consultationResposne);
        }
      }
    } else {
      this.router.navigateByUrl('/auth');
      this.consultationService.enableSubmitResponse.next(false);
    }
  }

  getConsultationResponse() {
    const consultationResponse =  {
      consultationId: this.consultationId,
      visibility: this.responseVisibility ? 'shared' : 'anonymous',
      responseText: this.responseText
    };
    if (this.checkProperties(consultationResponse)) {
      consultationResponse['templateId'] = this.templateId ? this.templateId : null;
      return consultationResponse;
    }
    return;
  }

  checkProperties(obj) {
    for (const key in obj) {
      if (obj[key] === null ||  obj[key] === '' || obj[key] === undefined) {
        return false;
      }
    }
    return true;
  }

  getCurrentUser() {
    this.userService.userLoaded$
    .subscribe((data) => {
      if (data) {
        this.currentUser = this.userService.currentUser;
      } else {
        this.currentUser = null;
      }
    });
  }

  getResponseText() {
    let draftObj: any = localStorage.getItem('responseDraft');
    if (draftObj && this.currentUser) {
      draftObj = JSON.parse(draftObj);
      const currentUser = draftObj.users.find(user => user.id === this.currentUser.id);
      if (currentUser) {
        const consultation = currentUser.consultations.find(item => item.id === this.consultationId);
        if (consultation) {
          this.responseText = consultation.responseText;
          if (consultation.templatesText) {
            this.showPublicResponseOption = false;
          }
          this.consultationService.enableSubmitResponse.next(true);
        }
      }
    }
  }

  editIframe() {
    const editorElement = document.getElementById('editor-container');
    if (editorElement) {
      const iFrameElements =  editorElement.getElementsByTagName('iframe');
      if (iFrameElements.length) {
       const doc = iFrameElements[0].contentDocument;
       const checkElementExist = setInterval(() => {
         if (!this.customStyleAdded) {
           if (doc.body) {
               this.customStyleAdded = true;
               doc.body.setAttribute('style', 'margin: 0; font-size: 16px');
           }
         }
       }, 100);
       if (this.customStyleAdded) {
         clearInterval(checkElementExist);
       }
      }
    }
  }

  enableSubmitResponse(value) {
    if (!value) {
      this.consultationService.enableSubmitResponse.next(false);
      return;
    } else {
      if (this.usingTemplate) {
        this.responseText = this.templateText = value;
        this.usingTemplate = this.showPublicResponseOption = false;
        this.autoSave(value);
      }
      if (this.templateText && (value === this.templateText)) {
        this.showPublicResponseOption = false;
      } else {
        this.showPublicResponseOption = true;
      }
      this.consultationService.enableSubmitResponse.next(true);
      return;
    }
  }

  autoSave(text) {
    if (text)  {
      this.showAutoSaved = true;
      let draftObj: any = localStorage.getItem('responseDraft');
      if (!draftObj) {
        draftObj = {};
        draftObj['users'] = [{
          id: this.currentUser.id,
          consultations: [{
            id: this.consultationId,
            responseText: text,
            templatesText: this.showPublicResponseOption ? false : true
          }]
        }];
      } else {
        draftObj = JSON.parse(draftObj);
        const currentUser = draftObj.users.find(user => user.id === this.currentUser.id);
        if (currentUser) {
          const consultation = currentUser.consultations.find(item => item.id === this.consultationId);
          if (consultation) {
            currentUser.consultations.forEach(item => {
              if (+item.id === +this.consultationId) {
                item.responseText = text;
                item['templatesText'] = this.showPublicResponseOption ? false : true;
              }
            });
          } else {
            currentUser.consultations.push({
              id: this.consultationId,
              responseText: text,
              templatesText: this.showPublicResponseOption ? false : true
            });
          }
          draftObj.users.forEach((item) => {
            if (item.id === this.currentUser.id) {
              item = currentUser;
            }
          });
        } else {
          draftObj.users.push({
            id: this.currentUser.id,
            consultations: [{
              id: this.consultationId,
              responseText: text,
              templatesText: this.showPublicResponseOption ? false : true
            }]
          });
        }
      }
      localStorage.setItem('responseDraft', JSON.stringify(draftObj));
      setTimeout(() => {
        this.showAutoSaved = false;
      }, 1250);
    }
  }

  subscribeUseTheResponseText() {
    this.consultationService.useThisResponseText.subscribe((obj: any) => {
      if (obj && !isObjectEmpty(obj)) {
        this.usingTemplate = true;
        const {responseText, templateId} = obj;
        this.responseText = this.templateText = responseText;
        this.templateId = templateId;
        this.customStyleAdded = false;
        this.editIframe();
        window.scrollTo({
          top: this.responseIndex.nativeElement.offsetTop - 80,
          behavior: 'smooth',
        });
      }
    });
  }

  scrollToCreateResponse() {
    this.consultationService.scrollToCreateResponse
    .subscribe((scrollTo) => {
      if (scrollTo) {
        window.scrollTo({
          top: this.responseIndex.nativeElement.offsetTop - 80,
          behavior: 'smooth',
        });
        this.consultationService.scrollToCreateResponse.next(false);
      }
    });
  }

  scrollToResponses() {
    this.consultationService.scrollToPublicResponse.next(true);
  }

}
