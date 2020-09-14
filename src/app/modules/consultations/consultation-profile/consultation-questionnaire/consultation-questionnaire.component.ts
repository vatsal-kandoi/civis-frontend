import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { ConsultationsService } from 'src/app/shared/services/consultations.service';
import { isObjectEmpty, checkPropertiesPresence } from '../../../../shared/functions/modular.functions';
import { atLeastOneCheckboxCheckedValidator } from 'src/app/shared/validators/checkbox-validator';
import { Apollo } from 'apollo-angular';
import { SubmitResponseQuery, ConsultationProfileCurrentUser } from '../consultation-profile.graphql';
import { filter, map } from 'rxjs/operators';
import { ErrorService } from 'src/app/shared/components/error-modal/error.service';


@Component({
  selector: 'app-consultation-questionnaire',
  templateUrl: './consultation-questionnaire.component.html',
  styleUrls: ['./consultation-questionnaire.component.scss']
})
export class ConsultationQuestionnaireComponent implements OnInit, AfterViewInit {

  @Input() profileData;
  @Output() openThankYouModal: EventEmitter<any> = new EventEmitter();
  @ViewChild('questionnaireContainer', { read: ElementRef , static: false }) questionnaireContainer: ElementRef<any>;

  responseFeedback: string;
  questionnaireForm: FormGroup;
  currentUser: any;
  responseAnswers: any[];
  showError: boolean;
  responseVisibility: any;
  longTextAnswer: any;
  templateText: any;
  templateId: any;
  responseSubmitLoading: boolean;
  consultationId: any;
  showConfirmEmailModal: boolean;

  constructor(private _fb: FormBuilder,
    private userService: UserService,
    private consultationService: ConsultationsService,
    private apollo: Apollo,
    private errorService: ErrorService) {
    this.questionnaireForm = this._fb.group({});
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
    this.subscribeProfileData();
    this.validateAnswers();
  }

  ngAfterViewInit() {
    this.subscribeUseTheResponseAnswer();
  }

  setSatisfactoryRating(value) {
    this.responseFeedback = value;
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
      const questions =  this.profileData.questions;
      const form = new FormGroup({});
      questions.forEach(question => {
        if (question.questionType !== 'checkbox') {
          question.isOptional ? form.addControl(question.id, new FormControl(null)) :
          form.addControl(question.id, new FormControl(null, Validators.required ));
        } else if (question.questionType === 'checkbox') {
          form.addControl(question.id, this.makeCheckboxQuestionOptions(question));
        }
        if (question.is_other) {
          question.isOptional ? form.addControl('other_answer-' + question.id, new FormControl(null)) :
           form.addControl('other_answer-' + question.id, new FormControl(null, Validators.required));
        }
      });
      return form;
    }
  }

  makeCheckboxQuestionOptions(question) {
    let form: any;
    form = question.isOptional ? new FormGroup({}) : new FormGroup({}, {
      validators: atLeastOneCheckboxCheckedValidator()
    });
    question.subQuestions.forEach(subQuestion => {
      form.addControl(subQuestion.id, new FormControl(false));
    });
    return form;
  }

  toggleCheckbox(questionId, subQuestionId) {
    const control = this.questionnaireForm.get([questionId, subQuestionId]);
    control.patchValue(!control.value);
  }

  validCurrentUser() {
    if (this.currentUser && !this.currentUser.confirmedAt) {
      this.showConfirmEmailModal = true;
      return false;
    }
    return true;
  }

  submitAnswer() {
    if (!this.validCurrentUser()) {
      return;
    }
    if (this.questionnaireForm.valid && this.responseFeedback) {
      this.responseAnswers = this.getResponseAnswers();
      const consultationResponse = this.getConsultationResponse();
      if (!isObjectEmpty(consultationResponse)) {
        this.submitResponse(consultationResponse);
        this.showError = false;
      }
    } else {
      this.showError = true;
    }
  }

  getResponseAnswers () {
    const answers = {...this.questionnaireForm.value};
    const responseAnswers = [];
    for (const item in answers) {
      if (answers.hasOwnProperty(item) && answers[item] !== null) {
        if (typeof(answers[item]) === 'object') {
            const keys = Object.keys(answers[item]);
            const filtered = keys.filter(function(key) {
                return answers[item][key];
            });
            answers[item] = filtered;
            let otherElement = false;
            for (let i = 0 ; i < answers[item].length; i++) {
              if (answers[item][i] === 'other') {
                otherElement = true;
                break;
              }
            }
            if (otherElement) {
              const filteredAnswers = answers[item].filter(val => {
                return val !== 'other';
              });
              if (filteredAnswers.length > 0) {
                responseAnswers.push({
                  question_id: item,
                  is_other: true,
                  other_option_answer: answers['other_answer-' + item],
                  answer: filteredAnswers
                });
              } else {
                responseAnswers.push({
                  question_id: item,
                  is_other: true,
                  other_option_answer: answers['other_answer-' + item]
                });
              }
            } else {
              if (answers[item].length > 0) {
                responseAnswers.push({
                  question_id: item,
                  answer: answers[item]
                });
              }
            }
        }
        if (answers[item] === 'other') {
          responseAnswers.push({
            question_id: item,
            is_other: true,
            other_option_answer: answers['other_answer-' + item],
          });
        } else if (!(item.includes('other')) && !Array.isArray(answers[item])) {
          if (answers[item].length > 0 || typeof answers[item] !== 'string') {
            responseAnswers.push({
              question_id: item,
              answer: answers[item]
            });
          }
        }
      }
    }
    return responseAnswers;
  }

  validateAnswers() {
    this.consultationService.validateAnswers.subscribe((value) => {
      if (value) {
        this.submitAnswer();
        this.consultationService.validateAnswers.next(false);
      }
    });
  }

  getConsultationResponse() {
    const consultationResponse =  {
      consultationId: this.profileData.id,
      satisfactionRating : this.responseFeedback,
      visibility: this.responseVisibility ? 'shared' : 'anonymous',
    };
    if (checkPropertiesPresence(consultationResponse)) {
      consultationResponse['templateId'] = this.templateId;
      consultationResponse['answers'] = this.responseAnswers;
      return consultationResponse;
    }
    return;
  }

  onAnswerChange(question?, value?, checkboxValue?) {
    if (question && value.id === 'other') {
      let otherValue = true;
      if (question.questionType === 'checkbox' && value.id === 'other' && !checkboxValue) {
         otherValue = false;
      }
      for (let i = 0; i < this.profileData.questions.length; i++) {
        if (this.profileData.questions[i].id === question.id) {
          this.profileData.questions[i].is_other = otherValue;
          if (question.isOptional) {
            this.questionnaireForm.addControl('other_answer-' + question.id, new FormControl(null));
          } else {
            this.questionnaireForm.addControl('other_answer-' + question.id, new FormControl(null, Validators.required));
          }
          break;
        }
      }
    } else {
      if (question.questionType !== 'checkbox') {
        this.profileData.questions.forEach(ques => {
          if (question.id === ques.id) {
            ques.is_other = false;
          }
        });
      }
    }
  }

  subscribeUseTheResponseAnswer() {
    this.consultationService.useThisResponseAnswer.subscribe((obj: any) => {
      if (obj && !isObjectEmpty(obj)) {
        const {templateId, longTextResponses} = obj;
        this.templateId = templateId;
        longTextResponses.map((response) => {
          const controlName = response.id.toString();
          this.longTextAnswer = this.templateText = response.answer;
            const textAreaElement = document.getElementById(`text-area-${controlName}`);
            if (textAreaElement) {
              window.scrollTo({
                top: this.questionnaireContainer.nativeElement.offsetTop - 80,
                behavior: 'smooth',
              });
              this.questionnaireForm.get(controlName).patchValue(this.longTextAnswer);
            }
        });

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
          resp.consultationProfile.responseSubmissionMessage = res.consultationResponseCreate.consultation.responseSubmissionMessage;
          resp.consultationProfile.satisfactionRatingDistribution =
            res.consultationResponseCreate.consultation.satisfactionRatingDistribution;
        }
        store.writeQuery({query: ConsultationProfileCurrentUser, variables, data: resp});
      }
    })
    .pipe (
      map((res: any) => res.data.consultationResponseCreate)
    )
    .subscribe(() => {
      this.openThankYouModal.emit();
    }, err => {
      this.responseSubmitLoading = false;
      this.errorService.showErrorModal(err);
    });
  }

}
