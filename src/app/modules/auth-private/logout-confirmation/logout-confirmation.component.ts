import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-logout-confirmation',
  templateUrl: './logout-confirmation.component.html',
  styleUrls: ['./logout-confirmation.component.scss']
})
export class LogoutConfirmationComponent implements OnInit {

  @ViewChild('logoutConfirmationModal', { static: false }) logoutConfirmationModal: ModalDirective;
  
  constructor() { }

  ngOnInit(): void {
  }

}
