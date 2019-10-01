import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { ConsultationProfileQuery } from './consultations-summary.graphql';
import { ErrorService } from 'src/app/shared/components/error-modal/error.service';



@Component({
  selector: 'app-consultations-summary',
  templateUrl: './consultations-summary.component.html',
  styleUrls: ['./consultations-summary.component.scss']
})
export class ConsultationsSummaryComponent implements OnInit {
  consultationId: number;
  responseToken: any;
  profileData: any;
  responseList: any;
  publicResponses: any;
  annonymousResponses: any;
  summaryData: any;

  constructor(private activatedRoute: ActivatedRoute, private apollo: Apollo, private errorService: ErrorService) {
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
          this.responseList = data.responses.edges
          this.splitResponses(this.responseList);
      }, err => {
        this.errorService.showErrorModal(err);
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
