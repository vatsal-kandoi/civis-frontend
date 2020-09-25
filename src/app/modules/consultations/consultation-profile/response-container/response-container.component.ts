import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-response-container',
  templateUrl: './response-container.component.html',
  styleUrls: ['./response-container.component.scss']
})
export class ResponseContainerComponent implements OnInit {

  @Input() response;
  @Input() activeRoundNumber;

  constructor() { }

  ngOnInit(): void {
  }

}
