import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-user-profile-modal',
  templateUrl: './user-profile-modal.component.html',
  styleUrls: ['./user-profile-modal.component.scss']
})
export class UserProfileModalComponent implements OnInit {

  @Input() leaderData: any;
  @Output() close: EventEmitter<any> = new EventEmitter();
  @ViewChild('leaderModal', { static: false }) leaderModal: ModalDirective;


  constructor() { }

  ngOnInit() {
  }
  closeModal() {
    this.leaderModal.hide();
    this.close.emit(true);
  }

}
