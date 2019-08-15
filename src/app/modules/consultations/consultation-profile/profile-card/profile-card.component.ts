import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { ConsultationsService } from 'src/app/shared/services/consultations.service';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements OnInit {

  @Input() profile: any;
  enableSubmitResponse: boolean;
  currentUser: any;
  @Output() openFeedbackModal: EventEmitter<boolean> = new EventEmitter();


  constructor(private consultationsService: ConsultationsService ) { }

  ngOnInit() {
      this.CheckSubmitResponseEnabled();
  }

  getRemainigDays(deadline) {
    const today = moment();
    const lastDate = moment(deadline);
    const difference = lastDate.diff(today, 'days');
    if (difference <= 0) {
      return 'Expired';
    } else {
      return `${difference} Days Remaining`;
    }
  }

  convertDateFormat(date) {
    return moment(date).format('Do MMM YY');
  }

  CheckSubmitResponseEnabled() {
    this.consultationsService.enableSubmitResponse
    .subscribe((value) => {
      if (value) {
        this.enableSubmitResponse = true;
      } else {
        this.enableSubmitResponse = false;
      }
    });
  }

  stepNext() {
    if (this.enableSubmitResponse) {
      this.openFeedbackModal.emit(true);
    }
  }
}
