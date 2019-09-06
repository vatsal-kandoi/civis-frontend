import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as moment from 'moment';
import { UserService } from 'src/app/shared/services/user.service';
import { ConsultationProfileCurrentUser, ConsultationProfile, SubmitResponseQuery, VoteCreateQuery } from '../consultation-profile.graphql';
import { Apollo } from 'apollo-angular';
import { map, filter } from 'rxjs/operators';
import { ErrorService } from 'src/app/shared/components/error-modal/error.service';
import { ConsultationsService } from 'src/app/shared/services/consultations.service';
import { ModalDirective } from 'ngx-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-read-respond',
  templateUrl: './read-respond.component.html',
  styleUrls: ['./read-respond.component.scss']
})
export class ReadRespondComponent implements OnInit {


  @ViewChild('feedbackModal', { static: false }) feedbackModal: ModalDirective;
  @ViewChild('responseIndex', { read: ElementRef , static: false }) panel: ElementRef<any>;

  profileData: any;
  responseList: any;
  consultationId: number;
  satisfactionRatingDistribution: any;
  responseFeedback: any;
  responseText = '';
  responseVisibility = true;
  step: number;
  currentUser: any;
  responseType = '';
  templateId = null;
  responseSubmitted: boolean;
  responseSubmitLoading: boolean;


  constructor(
    private consultationsService: ConsultationsService,
    private router: Router,
    private userService: UserService,
    private apollo: Apollo,
    private errorService: ErrorService,
    private consultationService: ConsultationsService,
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
    this.createSatisfactionRating();
    this.scrollToCreateResponse();
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
        this.satisfactionRatingDistribution = data.satisfactionRatingDistribution;
        this.responseList = data.sharedResponses.edges;
    }, err => {
      this.errorService.showErrorModal(err);
    });
  }

  openFeedbackModal() {
    if (this.responseText) {
      this.checkUserPresent();
    }
  }

  closeFeedbackModal() {
    this.step = null;
    this.feedbackModal.hide();
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
      responseText : this.responseText,
      satisfactionRating : this.responseFeedback,
      visibility: this.responseVisibility ? 'shared' : 'anonymous',
    };
    if (this.checkProperties(consultationResponse)) {
      consultationResponse['templateId'] = this.templateId;
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
      this.consultationService.enableSubmitResponse.next(false);
    }, err => {
      this.responseSubmitLoading = false;
      this.errorService.showErrorModal(err);
    });
  }

  vote(direction, response) {
    if (response.votedAs && (response.votedAs.voteDirection === direction) ) {
      return;
    }
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
                if (response.votedAs) {
                  value.node[response.votedAs.voteDirection + 'VoteCount'] -= 1;
                }
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
      console.log(data);
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
        return 'Closed';
      } else {
        return `Active`;
      }
    }
  }

  scrollToCreateResponse() {
    this.consultationService.scrollToCreateResponse
    .subscribe((scrollTo) => {
      if (scrollTo) {
        window.scrollTo({
          top: this.panel.nativeElement.offsetTop,
          behavior: 'smooth',
        });
        this.consultationService.scrollToCreateResponse.next(false);
      }
    });
  }

  useThisResponse(response) {
    if (response) {
      this.responseText = response.responseText;
      this.templateId = response.id;
      window.scrollTo({
        top: this.panel.nativeElement.offsetTop,
        behavior: 'smooth',
      });
      if (this.responseText) {
        this.consultationsService.enableSubmitResponse.next(true);
      }
    }
  }


}
