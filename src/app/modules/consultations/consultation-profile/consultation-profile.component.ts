import { Component, OnInit } from '@angular/core';
import { ConsultationProfile } from './consultation-profile.graphql';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-consultation-profile',
  templateUrl: './consultation-profile.component.html',
  styleUrls: ['./consultation-profile.component.scss']
})

export class ConsultationProfileComponent implements OnInit {
  
  private subscription: Subscription;
  profileData: any;
  responseList: any;
  consultationId: number;

  constructor ( 
    private activatedRoute: ActivatedRoute,
    private apollo: Apollo
  ) { 
      this.subscription = this.activatedRoute.params.subscribe((param: any) => {
        this.consultationId = +param['id'];
        console.log(param['id']);
        if(this.consultationId) {
          this.getConsultationProfile();
        }
      });
  }

  ngOnInit() {
  }
  
  getConsultationProfile() {
    this.apollo.query({
      query: ConsultationProfile, 
      variables: {id: this.consultationId}
    })
    .pipe (
      map((res: any) => res.data.consultationProfile)
    )
    .subscribe((data: any) => {
        this.profileData = data;
        this.responseList = data.responses.edges
        console.log(this.responseList);
    }, err => {
      console.log('err', err);
    });
  }
  
  ngOnDestroy() {
		this.subscription.unsubscribe();
	}
  
}

