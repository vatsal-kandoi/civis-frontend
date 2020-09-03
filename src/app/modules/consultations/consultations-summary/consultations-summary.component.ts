import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { ConsultationProfileQuery } from './consultations-summary.graphql';
import { ErrorService } from 'src/app/shared/components/error-modal/error.service';
import { CookieService } from 'ngx-cookie';


@Component({
  selector: 'app-consultations-summary',
  templateUrl: './consultations-summary.component.html',
  styleUrls: ['./consultations-summary.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ConsultationsSummaryComponent implements OnInit {

  consultationId: number;
  responseToken: any;
  profileData: any;
  responseList: any;
  publicResponses: any;
  annonymousResponses: any;
  summaryData: any;
  responseQuestions: any;
  currentLanguage: any;
  satisfactionRatingDistribution: any;
  useSummaryHindi: boolean;

  constructor(private activatedRoute: ActivatedRoute,
              private apollo: Apollo,
              private errorService: ErrorService,
              private _cookieService: CookieService,
              ) {
    this.activatedRoute.params.subscribe((param: any) => {
      this.consultationId = +param['id'];
    });
    this.activatedRoute.queryParams
    .subscribe((queryParams: any) => {
      if (queryParams) {
        this.responseToken = queryParams.response_token;
      }
    });
    this.getConsultationProfile();
   }

  ngOnInit() {

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

  getConsultationProfile() {
    if (this.consultationId && this.responseToken) {
      this.apollo.query({
        query: ConsultationProfileQuery,
        variables: {id: this.consultationId, responseToken: this.responseToken}
      })
      .pipe (
        map((res: any) => res.data.consultationProfile)
      )
      .subscribe((data: any) => {
          this.profileData = data;
          this.responseQuestions = this.profileData.questions;
          this.satisfactionRatingDistribution = data.satisfactionRatingDistribution;
          this.getProfileSummary();
          this.responseList = data.responses.edges;
          this.splitResponses(this.responseList);
      }, err => {
        const e = new Error(err);
      if (!e.message.includes('Invalid Access Token')) {
        this.errorService.showErrorModal(err);
      }
      });
    }
  }

  splitResponses(responsesList) {
    if (responsesList.length) {
      this.annonymousResponses = responsesList.filter(response => (response.node.user === null || response.node.user === undefined));
      this.publicResponses = responsesList.filter(response => response.node.user !== null);
      this.summaryData = {
        publicResponseCount : this.publicResponses.length,
        title: 'RESPONSES TO'
      };
    }
  }

}
