import { Component, OnInit, ViewChild, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { ConsultationsService } from 'src/app/shared/services/consultations.service';
import { filter, map } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import { ErrorService } from 'src/app/shared/components/error-modal/error.service';
import { SubmitResponseQuery, ConsultationProfileCurrentUser } from '../consultation-profile.graphql';
import { isObjectEmpty } from 'src/app/shared/functions/modular.functions';

@Component({
  selector: 'app-feedback-modal',
  templateUrl: './feedback-modal.component.html',
  styleUrls: ['./feedback-modal.component.scss']
})
export class FeedbackModalComponent implements OnInit, OnDestroy {
  @ViewChild('feedbackModal', { static: false }) feedbackModal: ModalDirective;
  @Output() closeFeedbackModal: EventEmitter<any> = new EventEmitter();
  @Input() consultationResponse;


  showFeedbackModal = true;
  responseFeedback: any;
  responseSubmitted: any;
  consultationId: any;
  responseSubmitLoading: boolean;
  earnedPoints: any;
  satisfactionRatingDistribution: any;



  constructor(private consultationService: ConsultationsService,
              private apollo: Apollo,
              private errorService: ErrorService) {
    this.consultationService.consultationId$
    .pipe(
      filter(i => i !== null)
    )
    .subscribe((consulationId: any) => {
      this.consultationId = consulationId;
    });
   }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.consultationService.openFeedbackModal.next(false);
  }

  closeModal() {
    this.closeFeedbackModal.emit();
    this.showFeedbackModal = false;
  }

  choose(value) {
    if (!this.responseFeedback && !this.responseSubmitted) {
      this.responseFeedback = value;
    }
  }

  createResponse() {
    if (this.responseFeedback && !isObjectEmpty(this.consultationResponse)) {
      this.responseSubmitLoading = true;
      this.consultationResponse['satisfactionRating'] = this.responseFeedback;
      this.apollo.mutate({
        mutation: SubmitResponseQuery,
        variables: {
          consultationResponse: this.consultationResponse
        },
        update: (store, {data: res}) => {
          const variables = {id: this.consultationId};
          const resp: any = store.readQuery({query: ConsultationProfileCurrentUser, variables});
          if (res) {
            resp.consultationProfile.respondedOn = res.consultationResponseCreate.consultation.respondedOn;
            resp.consultationProfile.sharedResponses = res.consultationResponseCreate.consultation.sharedResponses;
            resp.consultationProfile.responseSubmissionMessage = res.consultationResponseCreate.consultation.responseSubmissionMessage;
            resp.consultationProfile.satisfactionRatingDistribution =
              res.consultationResponseCreate.consultation.satisfactionRatingDistribution;
          }
          store.writeQuery({query: ConsultationProfileCurrentUser, variables, data: resp});
        }
      })
      .pipe (
        map((res: any) => res.data.consultationResponseCreate)
      )
      .subscribe((response) => {
        this.responseSubmitted = true;
        this.responseSubmitLoading = false;
        this.earnedPoints = response.points;
        this.satisfactionRatingDistribution = response.consultation.satisfactionRatingDistribution;
        this.consultationService.enableSubmitResponse.next(false);
      }, err => {
        this.responseSubmitLoading = false;
        this.errorService.showErrorModal(err);
      });
    }
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


}
