import { Component, OnInit, ViewChild, ElementRef, HostListener, AfterViewChecked, ViewEncapsulation, Renderer2} from '@angular/core';
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
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { isObjectEmpty } from '../../../../shared/functions/modular.functions';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-read-respond',
  templateUrl: './read-respond.component.html',
  styleUrls: ['./read-respond.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ReadRespondComponent implements OnInit, AfterViewChecked {


  @ViewChild('feedbackModal', { static: false }) feedbackModal: ModalDirective;
  @ViewChild('thankyouModal', { static: false }) thankyouModal: ModalDirective;
  @ViewChild('responseIndex', { read: ElementRef, static: false }) responseIndex: ElementRef<any>;
  @ViewChild('startDraftingSection', { read: ElementRef, static: false }) startDraftingSection: ElementRef<any>;
  @ViewChild('responsesListContainer', { read: ElementRef , static: false }) responsesListContainer: ElementRef<any>;
  @ViewChild('questionnaireContainer', { read: ElementRef , static: false }) questionnaireContainer: ElementRef<any>;
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
  showShareBlock = false;
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
  responseId: any;
  questionnaireForm: any;
  showQuestions = false;
  responseQuestions: any;
  responseAnswers: any;
  showConfirmEmailModal: boolean;
  currentLanguage: any;
  useSummaryHindi: boolean;
  shareBtnClicked: boolean;
  longTextResponse: {};
  showError: boolean;
  enableCkEditor = false;
  showThankYouModal = false;
  copyStatus: boolean;

  constructor(
    private consultationsService: ConsultationsService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private apollo: Apollo,
    private errorService: ErrorService,
    private consultationService: ConsultationsService,
    private title: Title,
    private _cookieService: CookieService,
    private _fb: FormBuilder,
    private renderer: Renderer2,
    private elRef: ElementRef,
  ) {
    this.consultationService.consultationId$
    .pipe(
      filter(i => i !== null)
    )
    .subscribe((consulationId: any) => {
      this.consultationId = consulationId;
    });
    this.questionnaireForm = this._fb.group({});
  }

  ngOnInit() {
    this.currentUrl = window.location.href;
    this.getCurrentUser();
    this.createSatisfactionRating();
    this.scrollToCreateResponse();
    this.setActiveTab();
    this.getResponseText();
  }

  makeQuestionnaireModal() {
    if (this.profileData && this.profileData.questions) {
      const questions =  this.responseQuestions = this.profileData.questions;
      const form = new FormGroup({});

      questions.forEach(question => {
        if (question.questionType !== 'checkbox') {
          form.addControl(question.id, new FormControl(null, Validators.required ));
        } else if (question.questionType === 'checkbox') {
          form.addControl(question.id, this.makeCheckboxQuestionOptions(question));
        }
        form.addControl('other_answer-' + question.id, new FormControl(null));
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

  ngAfterViewChecked() {
    if (this.checkForFragments) {
      this.subscribeToFragment();
      this.checkForFragments = false;
    }
    this.editIframe();
  }

  submitAnswer() {
    if (this.questionnaireForm.valid && this.responseFeedback) {
      const answers = {...this.questionnaireForm.value};
      const value = [];
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
                  value.push({
                    question_id: item,
                    is_other: true,
                    other_option_answer: answers['other_answer-' + item],
                    answer: filteredAnswers
                  });
                } else {
                  value.push({
                    question_id: item,
                    is_other: true,
                    other_option_answer: answers['other_answer-' + item]
                  });
                }
              } else {
                value.push({
                  question_id: item,
                  answer: answers[item]
                });
              }
          }
          if (answers[item] === 'other') {
            value.push({
              question_id: item,
              is_other: true,
              other_option_answer: answers['other_answer-' + item],
            });
          } else if (!(item.includes('other')) && !Array.isArray(answers[item])) {
            value.push({
              question_id: item,
              answer: answers[item]
            });
          }

        }
     }

      this.responseAnswers = value;
      this.stepNext(this.profileData.respondedOn);
    } else {
      this.showError = true;
    }
  }

  onChange() {
    if (this.questionnaireForm.valid && this.responseFeedback) {
      this.consultationService.enableSubmitResponse.next(true);
      this.showError = false;
    }
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

  stepNext(hasResponseSubmited) {
    if (!this.currentUser || hasResponseSubmited) {
      return;
    }

    if (this.currentUser && !this.currentUser.confirmedAt) {
      this.showConfirmEmailModal = true;
      return;
    }

    this.consultationsService.openFeedbackModal.next(true);
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
      if (this.shareBtnClicked) {
        this.shareBtnClicked = false;
        return;
      }
      if (this.shareBlockElement.nativeElement.contains(targetElement)) {
            return;
      } else {
        this.showShareBlock = false;
      }
    }
  }

  mapAnswers(responseId, answers) {
    if (responseId && answers.length) {
      const responseAnswers = [];
      answers.map((item) => {
        let answer = {};
        if (this.responseQuestions && this.responseQuestions.length) {
          const responseQuestion = this.responseQuestions.find((question) => +question.id === +item.question_id);
          if (responseQuestion.questionType === 'multiple_choice') {
            answer = this.getMultiChoiceAnswer(responseQuestion, item.answer);
          } else  if (responseQuestion.questionType === 'checkbox') {
            answer = this.getCheckboxAnswer(responseQuestion, item.answer);
          } else {
            answer = {
              id: responseQuestion.id,
              questionType: responseQuestion.questionType,
              questionText: responseQuestion.questionText,
              answer: item.answer
            };
          }
        }
        responseAnswers.push(answer);
      });
      return responseAnswers;
    }
    return;
  }

  getCheckboxAnswer(responseQuestion, answers) {
    const checkboxAnswers = [];
    answers.map((id) => {
      responseQuestion.subQuestions.map((question) => {
        if (+id === +question.id) {
          checkboxAnswers.push(question.questionText);
        }
      });
    });
    return {
      id: responseQuestion.id,
      questionType: responseQuestion.questionType,
      questionText: responseQuestion.questionText,
      answer: checkboxAnswers
    };
  }


  getMultiChoiceAnswer(responseQuestion, subQuestionId) {
    const subQuestion = responseQuestion.subQuestions.find((question) => +question.id === +subQuestionId);
    return {
      id: responseQuestion.id,
      questionType: responseQuestion.questionType,
      questionText: responseQuestion.questionText,
      answer: subQuestion.questionText
    };
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
        if (this.profileData.questions && this.profileData.questions.length > 0) {
          this.profileData.questions.forEach(question => {
            if (question.supportsOther) {
              question.subQuestions.push({id: 'other', questionText: 'Other'});
              question.other_answer = 'other_answer-' + question.id;
            }
          });
        }
        this.satisfactionRatingDistribution = data.satisfactionRatingDistribution;
        this.responseList = data.sharedResponses.edges;
        this.createMetaTags(this.profileData);
        this.checkForFragments = true;
        this.questionnaireForm = this.makeQuestionnaireModal();
        this.getProfileSummary();
    }, err => {
      const e = new Error(err);
      if (!e.message.includes('Invalid Access Token')) {
        this.errorService.showErrorModal(err);
      }
    });
  }

  getProfileSummary() {
    this.currentLanguage = this._cookieService.get('civisLang');
    if (this.currentLanguage === 'hi') {
      const summaryHindi = this.profileData.summaryHindi;
      if (summaryHindi && summaryHindi.components.length) {
        this.useSummaryHindi = true;
      } else {
        this.useSummaryHindi = false;
      }
    } else {
      this.useSummaryHindi = false;
    }
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
    if (this.responseAnswers) {
      if (this.questionnaireForm && this.responseFeedback && this.currentUser) {
        this.createResponse();
      }
      return;
    }
    if (this.responseText) {
      this.checkUserPresent();
    }
  }

  closeFeedbackModal() {
    this.step = null;
    this.feedbackModal.hide();
    this.showThankYouModal = true;
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
      satisfactionRating : this.responseFeedback,
      visibility: this.responseVisibility ? 'shared' : 'anonymous',
    };
    if (this.checkProperties(consultationResponse)) {
      if (!this.questionnaireExist() && !this.responseText) {
        return;
      }
      consultationResponse['templateId'] = this.templateId;
      consultationResponse['answers'] = this.responseAnswers;
      consultationResponse['responseText'] = this.questionnaireExist() ? null : this.responseText;
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
      if (this.responseAnswers) {
        this.showThankYouModal = true;
      }
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

  getTwitterUrl(link, id?) {
    const text  = `I shared my feedback on ` +
                  `${this.profileData.title}, support me and share your feedback on %23Civis today!`;
    let url = `https://twitter.com/intent/tweet?text=${text}&url=${link}`;
    url = id ? url + `%23${id}` : url;
    return url;
  }

  copyMessage(val: string) {
    const selBox = this.renderer.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    this.renderer.appendChild(this.elRef.nativeElement, selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    this.renderer.removeChild(this.elRef.nativeElement, selBox);
    this.copyStatus = true;
  }

  getFbUrl(link) {
    if (link) {
      return `https://www.facebook.com/sharer/sharer.php?u=${link}`;
    }
    return null;
  }

  getWhatsappUrl(link) {
    if (link) {
      return `https://api.whatsapp.com/send?text=${link}`;
    }
    return null;
  }

  getLinkedinUrl(link) {
    if (link) {

      return `https://www.linkedin.com/shareArticle?mini=true&url=${link}`;

    }
    return null;
  }

  toggleShareBlock(id) {
    if (id) {
      this.responseId = id;
      this.showShareBlock = !this.showShareBlock;
    }
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
    this.enableCkEditor = true;
    return true;
  }

  setSatisfactoryRating(value) {
    if (this.responseFeedback) {
      return;
    }
    this.responseFeedback = value;
    this.showQuestions = true;
  }

  questionnaireExist() {
    if (this.profileData && this.profileData.questions) {
      const questions = this.profileData.questions; {
        if (questions.length) {
          return true;
        }
      }
    }
    return false;
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
        // window.scrollTo({
        //   top: this.responseIndex ? this.responseIndex.nativeElement.offsetTop : this.startDraftingSection.nativeElement.offsetTop,
        //   behavior: 'smooth',
        // });
        this.consultationService.scrollToCreateResponse.next(false);
      }
    });
  }

  scrollToResponses() {
    window.scrollTo({
      top: this.responsesListContainer.nativeElement.offsetTop - 80,
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
      this.longTextResponse = this.getLongTextAnswer(response);
      if (!isObjectEmpty(this.longTextResponse)) {
        this.responseText =  this.templateText = this.longTextResponse['answer'];
        const controlName = this.longTextResponse['id'].toString();
        if (this.showCreateResponse() && this.questionnaireExist()) {
          this.showQuestions = true;
          const checkTextAreaElementExist = setInterval(() => {
            const textAreaElement = document.getElementById(`text-area-${controlName}`);
            if (textAreaElement) {
              clearInterval(checkTextAreaElementExist);
              window.scrollTo({
                top: this.questionnaireContainer.nativeElement.offsetTop - 80,
                behavior: 'smooth',
              });
              this.questionnaireForm.get(controlName).patchValue(this.responseText);
            }
          }, 100);
        }
      } else {
        this.responseText =  this.templateText = response.responseText;
        window.scrollTo({
          top: this.responseIndex.nativeElement.offsetTop,
          behavior: 'smooth',
        });
        if (this.responseText) {
          this.consultationsService.enableSubmitResponse.next(true);
        }
      }
      this.templateId = response.id;
      this.customStyleAdded = false;
      this.editIframe();
    }
  }

  getWholeNumber(number) {
    if (number) {
        return Math.round(number);
    }
    return null;
  }

  getLongTextAnswer(response) {
    const answers = response && response.answers;
    let answer = {};
    if (answers && answers.length) {
      answers.map((item) => {
        if (this.responseQuestions && this.responseQuestions.length) {
          const responseQuestion = this.responseQuestions.find((question) => +question.id === +item.question_id);
          if (responseQuestion.questionType === 'long_text') {
            answer = {
              id: responseQuestion.id,
              questionType: responseQuestion.questionType,
              questionText: responseQuestion.questionText,
              answer: item.answer
            };
          }
        }
      });
      return answer;
    }
    return;
  }

}
