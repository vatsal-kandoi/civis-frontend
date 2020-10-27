import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Title} from '@angular/platform-browser';
import * as moment from 'moment';
import { UserService } from 'src/app/shared/services/user.service';
import { ConsultationProfileCurrentUser,
         ConsultationProfile} from '../consultation-profile.graphql';
import { Apollo } from 'apollo-angular';
import { map, filter } from 'rxjs/operators';
import { ErrorService } from 'src/app/shared/components/error-modal/error.service';
import { ConsultationsService } from 'src/app/shared/services/consultations.service';
import { CookieService } from 'ngx-cookie';
import { isObjectEmpty } from 'src/app/shared/functions/modular.functions';

@Component({
  selector: 'app-read-respond',
  templateUrl: './read-respond.component.html',
  styleUrls: ['./read-respond.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ReadRespondComponent implements OnInit {

  profileData: any;
  consultationId: number;
  currentUser: any;
  currentLanguage: any;
  useSummaryHindi: boolean;
  showThankYouModal = false;
  showFeedbackModal: boolean;
  consultationResponse: any;
  satisfactionRatingDistribution: any;
  loading: boolean;
  questionnaireExist: boolean;

  constructor(
    private userService: UserService,
    private apollo: Apollo,
    private errorService: ErrorService,
    private consultationService: ConsultationsService,
    private title: Title,
    private _cookieService: CookieService,
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
    this.getCurrentUser();
    this.setActiveTab();
  }

  public setTitle(newTitle: string) {
    this.title.setTitle(newTitle);
  }

  setActiveTab() {
    this.consultationService.activeTab.next('read & respond');
  }

  getConsultationProfile() {
    this.loading = true;
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
        const questions = this.consultationService.getQuestions(data);
        if (questions && questions.length > 0) {
          this.questionnaireExist = true;
          questions.forEach(question => {
            if (question.supportsOther) {
              let otherData = false;
              for (let i = 0; i < question.subQuestions.length ; i++) {
                if (question.subQuestions[i].id === 'other') {
                  otherData = true;
                  break;
                }
              }
              if (!otherData) {
                question.subQuestions.push({id: 'other', questionText: 'Other'});
                question.other_answer = 'other_answer-' + question.id;
              }
            }
          });
        }
        this.consultationService.consultationProfileData.next(data);
        this.satisfactionRatingDistribution = data.satisfactionRatingDistribution;
        this.createMetaTags(this.profileData);
        this.getProfileSummary();
        this.loading = false;
    }, err => {
      const e = new Error(err);
      if (!e.message.includes('Invalid Access Token')) {
        this.errorService.showErrorModal(err);
      }
      this.loading = false;
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

  openFeedbackModal(response) {
    this.showFeedbackModal = true;
    this.consultationResponse = response;
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
}
