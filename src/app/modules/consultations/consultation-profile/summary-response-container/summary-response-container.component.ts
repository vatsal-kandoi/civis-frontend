import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-summary-response-container',
  templateUrl: './summary-response-container.component.html',
  styleUrls: ['./summary-response-container.component.scss']
})
export class SummaryResponseContainerComponent implements OnInit {

  @Input() response;
  @Input() roundNumber;
  @Input() type;

  constructor() { }

  ngOnInit(): void {
  }

}
