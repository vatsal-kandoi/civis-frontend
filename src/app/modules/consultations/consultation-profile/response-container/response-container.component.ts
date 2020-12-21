import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-response-container',
  templateUrl: './response-container.component.html',
  styleUrls: ['./response-container.component.scss']
})
export class ResponseContainerComponent implements OnInit {

  @Input() response;
  @Input() activeRoundNumber;
  @Output() openProfile: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  openUserProfile(data) {
    this.openProfile.emit(data);
  }

}
