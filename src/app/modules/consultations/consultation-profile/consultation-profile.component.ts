import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ConsultationProfile, SubmitResponseQuery } from './consultation-profile.graphql';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { ModalDirective } from 'ngx-bootstrap';
import { UserService } from 'src/app/shared/services/user.service';
import { ConsultationsService } from 'src/app/shared/services/consultations.service';



@Component({
  selector: 'app-consultation-profile',
  templateUrl: './consultation-profile.component.html',
  styleUrls: ['./consultation-profile.component.scss']
})

export class ConsultationProfileComponent implements OnInit, OnDestroy {

  @ViewChild('feedbackModal') feedbackModal: ModalDirective;

  private subscription: Subscription;
  profileData: any;
  responseList: any;
  consultationId: number;
  satisfactionRatingDistribution: any;
  responseFeedback: any;
  responseText = '';
  responseVisibility = false;
  step: number;
  currentUser: any;

  constructor (
    private activatedRoute: ActivatedRoute,
    private apollo: Apollo,
    private userService: UserService,
    private consultationsService: ConsultationsService,
    private router: Router
  ) {
      this.subscription = this.activatedRoute.params.subscribe((param: any) => {
        this.consultationId = +param['id'];
        console.log(param['id']);
        if (this.consultationId) {
          this.getConsultationProfile();
        }
      });
  }

  ngOnInit() {
    this.getCurrentUser();
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
        this.satisfactionRatingDistribution = data.satisfactionRatingDistribution;
        this.responseList = data.responses.edges
        console.log(this.responseList);
    }, err => {
      console.log('err', err);
    });
  }

  openFeedbackModal(event?) {
    if (this.responseText) {
      if (this.currentUser) {
        this.step = 2;
        this.feedbackModal.show();
      } else {
        this.router.navigateByUrl('/auth');
        this.consultationsService.enableSubmitResponse.next(false);
      }

    }
  }

  submitResponse() {
    const consultationResponse =  {
      consultationId: this.consultationId,
      responseText : this.responseText,
      satisfactionRating : this.responseFeedback,
      visibility: this.responseVisibility ? 'public' : 'shared'
    };
    if (this.checkProperties(consultationResponse)) {
      this.apollo.mutate({
        mutation: SubmitResponseQuery,
        variables: {
          consultationResponse: consultationResponse
        }
      })
      .subscribe((res) => {
        console.log('response', res);
        this.feedbackModal.hide();
      });
    }
  }

  checkProperties(obj) {
    for (const key in obj) {
      if (obj[key] === null && obj[key] === '') {
        return false;
      }
    }
    return true;
}

  choose(value) {
    console.log(value);
    this.responseFeedback = value;
  }

  enableSubmitResponse(value) {
    if (!value) {
      this.consultationsService.enableSubmitResponse.next(false);
      return;
    } else {
      if (value.length === 1) {
        this.consultationsService.enableSubmitResponse.next(true);
        return;
      }
    }
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

  getPercentageValue(rating, selectedKey) {
    let total = 0;
    for (const key in rating) {
      if (rating[key]) {
        total += rating[key];
      }
    }
    const selectedPercentage = (rating[selectedKey] / total) * 100;
    return selectedPercentage;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

