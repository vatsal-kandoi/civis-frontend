import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { ConsultationProfileQuery } from './consultations-summary.graphql';
import { ErrorService } from 'src/app/shared/components/error-modal/error.service';
import * as Highcharts from 'highcharts';
import { ConsultationAnalysisQuery } from '../consultation-profile/consultation-profile.graphql';

declare var require: any;
const Boost = require('highcharts/modules/boost');
const noData = require('highcharts/modules/no-data-to-display');
const More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

@Component({
  selector: 'app-consultations-summary',
  templateUrl: './consultations-summary.component.html',
  styleUrls: ['./consultations-summary.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ConsultationsSummaryComponent implements OnInit {

  public options: any = {
    chart: {
        renderTo: 'highchartContainer',
        type: 'column'
    },
    title: {
      text: ''
    },
    credits: {
      enabled: false
    },
    xAxis: {
        type: 'category',
        lineWidth: 1,
        lineColor: '#6F6F6F',
        title: {
          useHTML: true,
          text: "<p style='color: #6F6F6F; font-size: 14px; margin: 5px 0'>" +
                "Keywords" +
                "</p>",
        },
    },
    yAxis: {
        min: 0,
        lineWidth: 1,
        lineColor: '#6F6F6F',
        gridLineWidth: 0,
        title: {
            useHTML: true,
            text: "<p style='color: #6F6F6F; font-size: 14px;'>Frequency of Occurance</p>"
        }
    },
    plotOptions: {
      column: {
        stacking: 'normal',
    }
    },
    series: []
  };

  consultationId: number;
  responseToken: any;
  profileData: any;
  responseList: any;
  publicResponses: any;
  annonymousResponses: any;
  summaryData: any;
  showKeywordGraph = true;
  responseQuestions: any;

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
    this.drawVenterGraph();
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

  drawVenterGraph() {
    if (this.consultationId) {
      this.apollo.query({
        query: ConsultationAnalysisQuery,
        variables: {id: +this.consultationId}
      })
      .subscribe((res: any) => {
        const consultationAnalyis: any = res.data.consultationAnalysis;
        if (typeof consultationAnalyis === 'string') {
          this.showKeywordGraph = false;
          return;
        }
        const title = Object.keys(consultationAnalyis)[0];
        if (consultationAnalyis && consultationAnalyis[title]) {
          for (const key in consultationAnalyis[title]) {
            if (consultationAnalyis[title].hasOwnProperty(key)
            && consultationAnalyis[title][key].length) {
              this.options.series.push({
                showInLegend: false,
                color: '#F0653A',
                enableMouseTracking: false,
                data: [[key, consultationAnalyis[title][key].length]]
              });
            }
         }
         Highcharts.chart('highchartContainer', this.options);
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
}
