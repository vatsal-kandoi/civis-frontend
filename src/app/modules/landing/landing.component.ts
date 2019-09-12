import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';
import { slideInRight } from '../../shared/animations/slide';
import { fadeIn } from '../../shared/animations/fade';
import { ConsultationList } from '../consultations/consultation-list/consultation-list.graphql';
import { ConsultationResponseList, ImpactStats, LeaderListQuery } from './landing.graphql'; 
import { ErrorService } from 'src/app/shared/components/error-modal/error.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  animations: [slideInRight, fadeIn],
  encapsulation: ViewEncapsulation.None
})

export class LandingComponent implements OnInit {
  coverCardData: any;
  latestResponse: any
  current_card_index = 0;
  current_response_index = 0;
  currentReponseData: any;
  activeTab = 'sumbit-response';
  impactStats: any;
  citizenLeaders: any;
  activeConsultations: any;
  closedConsultations: any;

constructor( private apollo: Apollo, private errorService: ErrorService) { }

  ngOnInit() {
    this.getConsultationCard('published');
    this.getLatestResponse();
    this.rotateFeature();
    this.getImpactStats();
    this.getCiitizenLeaders();
  }

  getConsultationCard(status) {
    const variables = {
      perPage: null,
      page: null,
      statusFilter: status,
      sort: 'response_deadline',
      sortDirection: 'desc',
      featuredFilter: status === 'published' ? true : false,
    };
    this.apollo.query({
      query: ConsultationList,
      variables: variables
    })
    .pipe (
      map((res: any) => res.data.consultationList.data)
    )
    .subscribe((item: any) => {
      if (status === 'published') {
        this.activeConsultations = item;
        if (this.activeConsultations.length  < 3) {
          this.getConsultationCard('expired');
        } else {
            this.coverCardData = item;
            return;
        }
      } else {
        this.closedConsultations = item;
        if (!this.activeConsultations.length) {
          this.coverCardData = item;
        } else {
          this.coverCardData = [this.activeConsultations, ...this.closedConsultations.slice(0, 3 - this.activeConsultations.length)];
        }
      }
    }, err => {
      console.log('err', err);
      this.errorService.showErrorModal(err);
    });
  }

  getLatestResponse() {
    this.apollo.query({
      query: ConsultationResponseList, 
      variables: {sort: 'created_at', sortDirection: 'desc'}
    })
    .pipe (
      map((res: any) => res.data.consultationResponseList)
    )
    .subscribe((response: any) => {
      this.latestResponse = response.data;
      this.currentReponseData = this.latestResponse[this.current_response_index];
    }, err => {
        console.log('err', err);
        this.errorService.showErrorModal(err);
    });
  }

  getImpactStats() {
    this.apollo.query({query: ImpactStats})
    .subscribe((stats: any) => {
      this.impactStats = stats.data.impactStats;
    });
  }

  getCiitizenLeaders() {
    this.apollo.query({
      query: LeaderListQuery,
      variables: {
        roleFilter: 'citizen',
        sort: 'points',
        sortDirection: 'desc'
      }
    })
    .pipe (
      map((res: any) => res.data.userList.data)
    )
    .subscribe ((citizens) => {
      this.citizenLeaders = citizens.length ? citizens.slice(0, 6) : null;
    });
  }

  rotateFeature() {
    interval(5000).subscribe(() => {

      if(this.current_card_index === 2) {
        this.current_card_index = 0;
      } else {
        this.current_card_index++;
      }

      if(this.current_response_index === 2) {
        this.current_response_index = 0;
        this.currentReponseData = this.latestResponse[this.current_response_index];
      } else {
        this.current_response_index++;
        this.currentReponseData = this.latestResponse[this.current_response_index];
      }

    });
  }

  changeCard(index) {
    this.current_card_index = index;
  }

  changeSlider(index) {
    this.current_response_index = index;
    this.currentReponseData = this.latestResponse[this.current_response_index];
  }

  nextSlide() {
    if (this.current_response_index == 2) {
      this.current_response_index = 0;
      this.currentReponseData = this.latestResponse[this.current_response_index];
    } else {
      this.current_response_index++;
      this.currentReponseData = this.latestResponse[this.current_response_index];
    }
  }

  previousSlide() {
    if (this.current_response_index == 0) {
      this.current_response_index = 2;
      this.currentReponseData = this.latestResponse[this.current_response_index];
    } else {
      this.current_response_index--;
      this.currentReponseData = this.latestResponse[this.current_response_index];
    }
  }

  submitResponse(tabName) {
    this.activeTab = tabName;
  }

  addConsultation(tabName) {
    this.activeTab = tabName;
  }

  numberWithCommas(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}
