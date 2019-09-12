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

  @ViewChild('updateUserModal', { static: false }) updateUserModal: ModalDirective;
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
  showSettings = false;
  showAchievement = true;
  showConsultation = false;
  openUploader: boolean;

  constructor(private userService: UserService, private apollo: Apollo) { }

  ngOnInit() {
    this.getCurrentUser();
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

  getBestRank(rank, rankType) {
    let bestRank = '';
    if (rankType) {
      switch (rankType) {
        case 'city':
          bestRank = `#${rank} in ${this.currentUser.city.name.toUppercase()}`;
          break;
        case 'state':
          bestRank = `#${rank} in ${this.currentUser.city.parent.name.toUppercase()}`;
          break;
        case 'national':
          bestRank = `#${rank} in INDIA`;
          break;
        default:
          break;
      }
    }
    return bestRank;
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
    if (userForm.valid) {
      this.update(userForm.value);
    }
  }

  update(value) {
    this.apollo.mutate({
      mutation: CurrentUserUpdate,
      variables : {
        user : value
      }
    }).subscribe ((res) => {
      this.closeModal();
      this.userService.getCurrentUser();
    });
  }

  changeDp(event) {
    if (event) {
      const file = {
        profilePictureFile : {
          filename: 'profile.png',
          content: event
        }
      };
      this.update(file);
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

  toggleSettings() {
    this.showSettings = !this.showSettings;
  }

  achievementTab() {
    this.showAchievement = true;
    this.showConsultation = false;
  }
  
  consultationTab() {
    this.showConsultation = true;
    this.showAchievement = false;
  }
}
