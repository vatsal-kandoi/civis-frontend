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
    let today = moment();
    let lastDate = moment(deadline);
    let difference = lastDate.diff(today, 'days');
    if (difference <= 0) {
      return 'Closed';
    } else {
      return `${difference} Days Remaining`;
    }
  }

}
