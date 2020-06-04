import { Component, OnInit, ViewChild, ElementRef, HostListener, AfterViewChecked, ViewEncapsulation} from '@angular/core';
import {Title} from '@angular/platform-browser';
import * as moment from 'moment';
import { UserService } from 'src/app/shared/services/user.service';
import { ConsultationProfileCurrentUser,
         ConsultationProfile,
         SubmitResponseQuery,
         VoteCreateQuery,
         VoteDeleteQuery } from '../consultation-profile.graphql';
import { Apollo } from 'apollo-angular';
import { map, filter } from 'rxjs/operators';
import { ErrorService } from 'src/app/shared/components/error-modal/error.service';
import { ConsultationsService } from 'src/app/shared/services/consultations.service';
import { ModalDirective } from 'ngx-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-read-respond',
  templateUrl: './read-respond.component.html',
  styleUrls: ['./read-respond.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ReadRespondComponent implements OnInit, AfterViewChecked {


  @ViewChild('feedbackModal', { static: false }) feedbackModal: ModalDirective;
  @ViewChild('responseIndex', { read: ElementRef , static: false }) panel: ElementRef<any>;
  @ViewChild('responsesListContainer', { read: ElementRef , static: false }) responsesListContainer: ElementRef<any>;
  @ViewChild('shareBlockElement', { static: false }) shareBlockElement: ElementRef;
  @ViewChild('shareButtonElement', { static: false }) shareButtonElement: ElementRef;

  profileData: any;
  responseList: any;
  consultationId: number;
  satisfactionRatingDistribution: any;
  responseFeedback: any;
  responseText = '';
  responseVisibility = false;
  step: number;
  currentUser: any;
  responseType = '';
  templateId = null;
  responseSubmitted: boolean;
  responseSubmitLoading: boolean;
  earnedPoints: any;
  fragment: string;
  currentUrl: string;
  showShareBlock: any;
  checkForFragments: boolean;
  showAutoSaved: boolean;
  selectedUser: any;
  showLeaderProfileModal: boolean;
  templateText: any;
  showPublicResponseOption = true;
  customStyleAdded: boolean;
  ckeConfig =  {
    removePlugins: 'elementspath',
    resize_enabled: false,
   };
  usingTemplate: boolean;

  constructor(
    private consultationsService: ConsultationsService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private apollo: Apollo,
    private errorService: ErrorService,
    private consultationService: ConsultationsService,
    private title: Title,
  ) {
    this.consultationService.consultationId$
    .pipe(
      filter(i => i !== null)
    )
    .subscribe((consulationId: any) => {
      this.consultationId = consulationId;
    });
  }

  ngOnInit() {
    this.currentUrl = window.location.href;
    this.getCurrentUser();
    this.createSatisfactionRating();
    this.scrollToCreateResponse();
    this.setActiveTab();
    this.getResponseText();
  }

  ngAfterViewChecked() {
    if (this.checkForFragments) {
      this.subscribeToFragment();
      this.checkForFragments = false;
    }
    this.editIframe();
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

  public setTitle(newTitle: string) {
    this.title.setTitle(newTitle);
  }

  setActiveTab() {
    this.consultationService.activeTab.next('read & respond');
  }

  @HostListener('document:click', ['$event.target'])
  onClick(targetElement) {
    if (this.showShareBlock) {
      if (this.shareBlockElement.nativeElement.contains(targetElement) ||
          this.shareButtonElement.nativeElement.contains(targetElement)) {
            return;
      } else {
        this.showShareBlock = false;
      }
    }
  }

  getConsultationProfile() {
    const query = ConsultationProfileCurrentUser;
    this.apollo.watchQuery({
      query: this.currentUser ? ConsultationProfileCurrentUser : ConsultationProfile,
      variables: {id: this.consultationId}
    })
    .valueChanges
    .pipe (
      map((res: any) => res.data.consultationProfile)
    )
    .subscribe((data: any) => {
        this.profileData = data;
        this.satisfactionRatingDistribution = data.satisfactionRatingDistribution;
        this.responseList = data.sharedResponses.edges;
        this.createMetaTags(this.profileData);
        this.checkForFragments = true;
    }, err => {
      this.errorService.showErrorModal(err);
    });
  }

  createMetaTags(consultationProfile) {
    const title = consultationProfile.title ? consultationProfile.title : '' ;
    const image = (consultationProfile['mininstry'] ?
    consultationProfile['mininstry']['category'] ?
    (consultationProfile['mininstry']['category']['coverPhoto'] ?
    consultationProfile['mininstry']['category']['coverPhoto']['url'] : '') : '' : '');
    const description = consultationProfile['summary'] ? (consultationProfile['summary'].length < 140 ?
                        consultationProfile['summary'] : consultationProfile['summary'].slice(0, 140)) : '';
    this.deleteMetaTags();
    this.setTitle(title);
    const smTags = [].concat(this.makeTwitterTags(description, title))
        .concat(this.makeFacebookTags(image, description, title));

    const head = document.getElementsByTagName('head')[0];
    for (const item of smTags) {
      head.appendChild(item);
    }
  }

  makeTwitterTags(description, title) {
    const tags = [];
    tags.push(this.createElement('meta', 'twitter:title', title));
    tags.push(this.createElement('meta', 'twitter:description', description));
    return tags;
  }

  makeFacebookTags(image, description, title) {
    const tags = [];
    tags.push(this.createElement('meta', 'og:title', title));
    tags.push(this.createElement('meta', 'og:url', window.location.href));
    tags.push(this.createElement('meta', 'og:type', 'website'));
    tags.push(this.createElement('meta', 'og:image', image));
    tags.push(this.createElement('meta', 'og:description', description));
    return tags;
  }

  deleteMetaTags() {
    const meta = document.querySelectorAll('meta');
    for (let i = 2; i < meta.length; i++) {
    meta[i].remove();
    }
  }

  createElement(el, attr, value) {
    const element = document.createElement(el);
    element.setAttribute('name', attr);
    element.setAttribute('content', value);
    return element;
  }

  openFeedbackModal() {
    if (this.responseText) {
      this.checkUserPresent();
    }
  }

  closeFeedbackModal() {
    this.step = null;
    this.feedbackModal.hide();
    this.consultationService.openFeedbackModal.next(false);
  }

  createSatisfactionRating() {
    this.consultationService.openFeedbackModal
    .subscribe((status) => {
      if (status) {
        this.openFeedbackModal();
      }
    });
  }

  checkUserPresent() {
    if (this.currentUser) {
      this.step = 2;
      this.feedbackModal.show();
    } else {
      this.router.navigateByUrl('/auth');
      this.consultationsService.enableSubmitResponse.next(false);
    }
  }

  createResponse() {
    const consultationResponse =  {
      consultationId: this.consultationId,
      responseText : this.responseText,
      satisfactionRating : this.responseFeedback,
      visibility: this.responseVisibility ? 'shared' : 'anonymous',
    };
    if (this.checkProperties(consultationResponse)) {
      consultationResponse['templateId'] = this.templateId;
      this.submitResponse(consultationResponse);
    }
  }

  checkProperties(obj) {
    for (const key in obj) {
      if (obj[key] === null ||  obj[key] === '' || obj[key] === undefined) {
        return false;
      }
    }
    return true;
  }

  subscribeToFragment() {
    this.route.fragment.subscribe(fragment => {
      this.fragment = fragment;
      if (this.fragment) {
        const element = document.getElementById(this.fragment);
        if (element) {
          window.scrollTo({
            top: element.getBoundingClientRect().top - 80,
            behavior: 'smooth',
          });
        }
      }
    });
  }


  submitResponse(consultationResponse) {
    this.responseSubmitLoading = true;
    this.apollo.mutate({
      mutation: SubmitResponseQuery,
      variables: {
        consultationResponse: consultationResponse
      },
      update: (store, {data: res}) => {
        const variables = {id: this.consultationId};
        const resp: any = store.readQuery({query: ConsultationProfileCurrentUser, variables});
        if (res) {
          resp.consultationProfile.respondedOn = res.consultationResponseCreate.consultation.respondedOn;
          resp.consultationProfile.sharedResponses = res.consultationResponseCreate.consultation.sharedResponses;
        }
        store.writeQuery({query: ConsultationProfileCurrentUser, variables, data: res});
      }
    })
    .pipe (
      map((res: any) => res.data.consultationResponseCreate)
    )
    .subscribe((response) => {
      this.responseSubmitted = true;
      this.responseSubmitLoading = false;
      this.earnedPoints = response.points;
      this.consultationService.enableSubmitResponse.next(false);
    }, err => {
      this.responseSubmitLoading = false;
      this.errorService.showErrorModal(err);
    });
  }

  vote(direction, response) {
    if (response.votedAs) {
      if (response.votedAs.voteDirection === direction) {
        this.undoVote(response, direction);
      } else {
        this.undoVote(response, direction, true);
      }
    } else {
      this.createVote(response, direction);
    }
  }

  undoVote(response, direction, createVote?) {
    if (response.id) {
      this.apollo.mutate({
        mutation: VoteDeleteQuery,
        variables: {
          consultationResponseId: response.id
        },
        update: (store, {data: res}) => {
          const variables = {id: this.consultationId};
          const resp: any = store.readQuery({query: ConsultationProfileCurrentUser, variables});
          if (res) {
            for (const value of resp['consultationProfile'].sharedResponses.edges) {
              if (value.node.id ===  response['id']) {
                if (response.votedAs) {
                  value.node[response.votedAs.voteDirection + 'VoteCount'] -= 1;
                }
                value.node.votedAs = null;
                break;
              }
            }
          }
          store.writeQuery({query: ConsultationProfileCurrentUser, variables, data: resp});
        }
      })
      .subscribe((res) => {
        if (createVote) {
          this.createVote(response, direction);
        }
      }, err => {
        this.errorService.showErrorModal(err);
      });
    }
  }

  createVote(response, direction) {
    const vote = {
      consultationResponseVote: {
        consultationResponseId: response.id,
        voteDirection: direction
      }
    };
    this.apollo.mutate({
      mutation: VoteCreateQuery,
      variables: vote,
      update: (store, {data: res}) => {
        const variables = {id: this.consultationId};
        const resp: any = store.readQuery({query: ConsultationProfileCurrentUser, variables});
        if (res) {
          for (const value of resp['consultationProfile'].sharedResponses.edges) {
            if (value.node.id ===  response['id']) {
              if (value.node[res.voteCreate.voteDirection + 'VoteCount']) {
                value.node[res.voteCreate.voteDirection + 'VoteCount'] += 1;
              } else {
                value.node[res.voteCreate.voteDirection + 'VoteCount'] = 1;
              }
              value.node.votedAs = res.voteCreate;
              break;
            }
          }
        }
        store.writeQuery({query: ConsultationProfileCurrentUser, variables, data: resp});
      }
    })
    .subscribe((data) => {
    }, err => {
      this.errorService.showErrorModal(err);
    });
  }

  choose(value) {
    if (!this.responseFeedback && !this.responseSubmitted) {
      this.responseFeedback = value;
    }
  }

  enableSubmitResponse(value) {
    if (!value) {
      this.consultationsService.enableSubmitResponse.next(false);
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
      this.consultationsService.enableSubmitResponse.next(true);
      return;
    }
  }


  getCurrentUser() {
    this.userService.userLoaded$
    .subscribe((data) => {
      if (data) {
        this.currentUser = this.userService.currentUser;
        if (this.consultationId) {
          this.getConsultationProfile();
        }
      } else {
        this.currentUser = null;
        if (this.consultationId) {
          this.getConsultationProfile();
        }
      }
    });
  }

  getPercentageValue(rating, selectedKey) {
    if (this.responseSubmitted) {
      let total = 0;
      for (const key in rating) {
        if (rating[key]) {
          total += rating[key];
        }
      }
      const selectedPercentage = (rating[selectedKey] / total) * 100;
      return selectedPercentage;
    }
    return 0;
  }

  getTwitterUrl(link, id) {
    const text  = `I shared my feedback on ` +
                  `${this.profileData.title}, support me and share your feedback on %23Civis today!`;
    const url = `https://twitter.com/intent/tweet?text=${text}&url=${link}%23${id}`;
    return url;
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

  getSharingUrl(id) {
    return this.currentUrl + `%23${id}`;
  }

  showCreateResponse() {
    if ((this.checkClosed(this.profileData ? this.profileData.responseDeadline : null) === 'Closed')
        || !this.currentUser || (this.profileData && this.profileData.respondedOn)) {
        return false;
    }
    return true;
  }

  checkClosed(deadline) {
    if (deadline) {
      const today = moment();
      const lastDate = moment(deadline);
      const difference = lastDate.diff(today, 'days');
      if (difference <= 0) {
        return difference === 0 ? 'Last day to respond' : 'Closed';
      } else {
        return `Active`;
      }
    }
  }

  scrollToCreateResponse() {
    this.consultationService.scrollToCreateResponse
    .subscribe((scrollTo) => {
      if (scrollTo) {
        window.scrollTo({
          top: this.panel.nativeElement.offsetTop,
          behavior: 'smooth',
        });
        this.consultationService.scrollToCreateResponse.next(false);
      }
    });
  }

  scrollToResponses() {
    window.scrollTo({
      top: this.responsesListContainer.nativeElement.getBoundingClientRect().top - 80,
      behavior: 'smooth',
    });
  }

  openUserProfile(data) {
    this.selectedUser = data.id;
    this.showLeaderProfileModal = true;
  }

  closeModal(event) {
    if (event) {
      this.showLeaderProfileModal = false;
    }
  }

  useThisResponse(response) {
    if (this.profileData.respondedOn) {
      return;
    }
    if (response) {
      this.usingTemplate = true;
      this.responseText =  this.templateText = response.responseText;
      this.templateId = response.id;
      window.scrollTo({
        top: this.panel.nativeElement.offsetTop,
        behavior: 'smooth',
      });
      if (this.responseText) {
        this.consultationsService.enableSubmitResponse.next(true);
      }
      this.customStyleAdded = false;
      this.editIframe();
    }
  }

}
