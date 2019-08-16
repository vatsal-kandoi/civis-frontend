import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-leader-board',
  templateUrl: './leader-board.component.html',
  styleUrls: ['./leader-board.component.scss'],
})
export class LeaderBoardComponent implements OnInit {

  level = null;

  levels = [
    {
      name: 'national'
    },
    {
      name: 'state'
    },
    {
      name: 'local'
    }
  ];

  @ViewChild('leaderModal') leaderModal: ModalDirective;

  constructor() { }

  ngOnInit() {
  }
  
  openLeaderModal() {
    this.leaderModal.show();
  }

  closeModal() {
    this.leaderModal.hide();
  }

  selectLevel(event) {
    this.level = event;
  }

}
