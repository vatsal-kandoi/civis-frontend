import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';
import { slideInRight } from '../../shared/animations/slide';
import { fadeIn } from '../../shared/animations/fade';
import { ConsultationList } from '../consultations/consultation-list/consultation-list.graphql';
import { ConsultationResponseList, ImpactStats } from './landing.graphql'; 

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  animations: [slideInRight, fadeIn],
})

export class LandingComponent implements OnInit {
  coverCardData: any;
  latestResponse: any
  current_card_index = 0;
  current_response_index = 0;
  currentReponseData: any;
  activeTab = 'sumbit-response';
  impactStats: any;
  

constructor( private apollo: Apollo ) { }
  
  ngOnInit() {
    this.getConsultationCard();
    this.getLatestResponse();
    this.rotateFeature();
    this.getImpactStats();
  }
  
  getConsultationCard() {
    const variables = {
      perPage: null,
      page: null,
      statusFilter: 'published',
      featuredFilter: true 
    };
    this.apollo.query({
      query: ConsultationList, 
      variables: variables
    })
    .pipe (
      map((res: any) => res.data.consultationList)
    )
    .subscribe((item: any) => {
        this.coverCardData = item.data;
    }, err => {
      console.log('err', err);
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
      this.latestResponse = response.data
      console.log(this.latestResponse, 'response')
      this.currentReponseData = this.latestResponse[this.current_response_index];
    }, err => {
        console.log('err', err);
    });
  }

  getImpactStats() {
    this.apollo.query({query: ImpactStats})
    .subscribe((stats: any) => {
      this.impactStats = stats.data.impactStats;
    })
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
    if(this.current_response_index == 2) {
      this.current_response_index = 0;
      this.currentReponseData = this.latestResponse[this.current_response_index];
    } else {
      this.current_response_index++
      this.currentReponseData = this.latestResponse[this.current_response_index];
    }
  }
  
  previousSlide() {
    if(this.current_response_index == 0) {
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
}
