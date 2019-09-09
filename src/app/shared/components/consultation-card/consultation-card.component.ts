import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-consultation-card',
  templateUrl: './consultation-card.component.html',
  styleUrls: ['./consultation-card.component.scss']
})
export class ConsultationCardComponent implements OnInit {
  @Input() consultation: any;
  @Input() type: string;

  constructor() { }

  ngOnInit() {
  }

  getRemainigDays(deadline) {
    if (this.consultation.status === 'expired') {
      return 'Closed';
    }
    const today = moment();
    const lastDate = moment(deadline);
    const difference = lastDate.diff(today, 'days');
    if (difference <= 0) {
      return difference === 0 ? 'Last day to respond' : 'Closed';
    } else {
      return `${difference} Days Remaining`;
    }
  }

}
