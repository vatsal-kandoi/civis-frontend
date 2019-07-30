import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements OnInit {

  @Input() profile: any;

  constructor() { }

  ngOnInit() {
  }
  
  getRemainigDays(deadline) {
    let today = moment();
    let lastDate = moment(deadline);
    let difference = lastDate.diff(today, 'days');
    if (difference <= 0) {
      return 'Expired'
    } else {
      return `${difference} Days Remaining`;
    }
  }
  
  convertDateFormat(date) {
    return moment(date).format("Do MMM YY");
  }
}
