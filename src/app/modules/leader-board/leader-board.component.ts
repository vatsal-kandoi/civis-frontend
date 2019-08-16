import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { modalSlideIn } from 'src/app/shared/animations/slide';

@Component({
  selector: 'app-leader-board',
  templateUrl: './leader-board.component.html',
  styleUrls: ['./leader-board.component.scss'],
  animations: [modalSlideIn],
})
export class LeaderBoardComponent implements OnInit {

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

}
