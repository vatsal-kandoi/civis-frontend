import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { ConsultationsService } from 'src/app/shared/services/consultations.service';
import { isObjectEmpty } from '../../../../shared/functions/modular.functions';

@Component({
  selector: 'app-consultation-questionnaire',
  templateUrl: './consultation-questionnaire.component.html',
  styleUrls: ['./consultation-questionnaire.component.scss']
})
export class ConsultationQuestionnaireComponent implements OnInit {

  @Input() profileData;
  responseFeedback: string;
  showQuestions: boolean;
  questionnaireForm: FormGroup;
  currentUser: any;
  responseQuestions: any;
  responseAnswers: any[];
  showError: boolean;
  responseVisibility: any;
  responseText: any;
  templateText: any;
  templateId: any;

  constructor(private _fb: FormBuilder, private userService: UserService, private consultationService: ConsultationsService) {
    this.questionnaireForm = this._fb.group({});
  }

  ngOnInit(): void {
    this.getCurrentUser();
    this.subscribeProfileData();
    this.subscribeUseTheResponseAnswer();
  }

  setSatisfactoryRating(value) {
    if (this.responseFeedback) {
      return;
    }
    this.responseFeedback = value;
    this.showQuestions = true;
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

  subscribeProfileData() {
    this.consultationService.consultationProfileData.subscribe((data) => {
      this.profileData = data;
      this.questionnaireForm = this.makeQuestionnaireModal();
    });
  }

  makeQuestionnaireModal() {
    if (this.profileData && this.profileData.questions) {
      const questions =  this.responseQuestions = this.profileData.questions;
      const form = new FormGroup({});

      questions.forEach(question => {
        if (question.questionType !== 'checkbox') {
          const control = new FormControl(null);
          if (!question.isOptional) {
            control.setValidators(Validators.required);
          }
          form.addControl(question.id, control);
        } else if (question.questionType === 'checkbox') {
          form.addControl(question.id, this.makeCheckboxQuestionOptions(question));
        }
      });
      return form;
    }
  }

  makeCheckboxQuestionOptions(question) {
      const form = new FormGroup({});
      question.subQuestions.forEach(subQuestion => {
        form.addControl(subQuestion.id, new FormControl(false));
      });
      return form;
    }

  toggleCheckbox(control, value) {
    control.patchValue(value);
  }

  toggle(questionId, subQuestionId) {
    const control = this.questionnaireForm.get([questionId, subQuestionId]);
    control.patchValue(!control.value);
  }

  submitAnswer() {
    if (this.questionnaireForm.valid && this.responseFeedback) {
      const answers = {...this.questionnaireForm.value};
      const value = [];
      for (const item in answers) {
        if (answers.hasOwnProperty(item)) {
          if (typeof(answers[item]) === 'object') {
              const keys = Object.keys(answers[item]);
              const filtered = keys.filter(function(key) {
                  return answers[item][key];
              });
              answers[item] = filtered;
          }
          value.push({
            question_id: item,
            answer: answers[item]
          });
        }
     }
      this.responseAnswers = value;
      this.showError = false;
      this.stepNext(this.profileData.respondedOn);
    } else {
      this.showError = true;
    }
  }

  validateAnswers() {
    this.consultationService.validateAnswers.subscribe((value) => {
      if (value) {
        this.submitAnswer();
        this.consultationService.validateAnswers.next(false);
      }
    });
  }

  stepNext(hasResponseSubmited) {
    if (!this.currentUser || hasResponseSubmited) {
      return;
    }

    if (this.currentUser && !this.currentUser.confirmedAt) {
      // this.showConfirmEmailModal = true;
      return;
    }
    this.createResponse();

  }

  createResponse() {
    const consultationResponse =  {
      consultationId: this.profileData.id,
      satisfactionRating : this.responseFeedback,
      visibility: this.responseVisibility ? 'shared' : 'anonymous',
    };
    if (this.checkProperties(consultationResponse)) {
      consultationResponse['templateId'] = this.templateId;
      consultationResponse['answers'] = this.responseAnswers;
      consultationResponse['responseText'] = this.responseText;
      // this.submitResponse(consultationResponse);
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

  subscribeUseTheResponseAnswer() {
    this.consultationService.useThisResponseAnswer.subscribe((obj: any) => {
      if (obj && !isObjectEmpty(obj)) {
        const {controlName, responseText, templateId} = obj;
        this.responseText = this.templateText = responseText;
        this.templateId = templateId;
        this.showQuestions = true;
        const checkTextAreaElementExist = setInterval(() => {
          const textAreaElement = document.getElementById(`text-area-${controlName}`);
          if (textAreaElement) {
            clearInterval(checkTextAreaElementExist);
            // window.scrollTo({
            //   top: this.questionnaireContainer.nativeElement.offsetTop - 80,
            //   behavior: 'smooth',
            // });
            this.questionnaireForm.get(controlName).patchValue(this.responseText);
          }
        }, 100);
      }
    });
  }

}
