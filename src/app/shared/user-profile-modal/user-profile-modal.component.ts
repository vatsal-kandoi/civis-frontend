import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile-modal',
  templateUrl: './user-profile-modal.component.html',
  styleUrls: ['./user-profile-modal.component.scss']
})
export class UserProfileModalComponent implements OnInit {

  @Input() leaderData: any;
  @Output() close: EventEmitter<any> = new EventEmitter();
  @ViewChild('leaderModal', { static: false }) leaderModal: ModalDirective;
  currentUser: any;


  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.getCurrentUser();
  }

  closeModal() {
    this.leaderModal.hide();
    this.close.emit(true);
  }

  getCurrentUser() {
    this.userService.userLoaded$
      .subscribe((data) => {
        if (data) {
          this.currentUser = this.userService.currentUser;
        } else {
          this.currentUser = null;
        }
      });
  }

  viewResponse(response) {
    this.router.navigateByUrl(`/consultations/${response.consultation.id}/read#${response.id}`);
  }

}
