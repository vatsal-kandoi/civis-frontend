import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs/Rx';
import { map } from 'rxjs/operators';
import { slideInRight } from '../../shared/animations/slide';
import { ConsultationList } from '../consultations/consultation-list/consultation-list.graphql';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  animations: [slideInRight],
})

export class LandingComponent implements OnInit {
  coverCardData: any;
  current_index = 0;

constructor( private apollo: Apollo ) { }
  
  ngOnInit() {
    this.getConsultationCard();
    this.rotateFeature();
  }
  
  getConsultationCard() {
    const variables = {
      perPage: null,
      page: null,
      statusFilter: 'published'
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
  
  rotateFeature() {
    Observable.interval(5000).subscribe(() => {
      if (this.current_index === 2) {
        this.current_index = 0;
      } else {
        this.current_index++;
      }
    });
  }

  changeCard(index) {
    this.current_index = index;
  }

}
