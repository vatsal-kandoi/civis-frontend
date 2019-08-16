import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { ModalDirective } from 'ngx-bootstrap';
import { Apollo } from 'apollo-angular';
import { CurrentUserUpdate } from './profile.graphql';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @ViewChild('updateUserModal') updateUserModal: ModalDirective;
  currentUser;
  showModal: boolean;
  user = {
    firstName: '',
    lastName: '',
    email: null,
    phoneNumber: null,
    password: ''
  };
  updateField = '';

  constructor(private userService: UserService, private apollo: Apollo) { }

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.userService.userLoaded$
    .subscribe((data) => {
      if (data) {
        this.currentUser = this.userService.currentUser;
      }
    });
  }

  openModal() {
    this.updateUserModal.show();
    this.showModal = true;
  }

  closeModal() {
    this.updateUserModal.hide();
    this.showModal = false;
  }

  updateUser(userForm) {
    console.log(userForm);
    if (userForm.valid) {
      this.apollo.mutate({
        mutation: CurrentUserUpdate,
        variables : {
          user : userForm.value
        }
      }).subscribe ((res) => {
        this.closeModal();
        this.userService.getCurrentUser();
      });
    }
  }

  getTotalPoints(responses) {
    let points = 0;
    if (responses.length) {
      responses.forEach( response => points += +response.node.points);
      return points;
    }
    return 0;
  }
}
