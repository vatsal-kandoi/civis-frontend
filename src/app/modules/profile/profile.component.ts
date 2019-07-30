import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import {filter, take} from 'rxjs/operators';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  currentUser;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.userService.userLoaded$
    .pipe(
      filter(data => !!data),
      take(1)
    )
    .subscribe((data) => {
      if (data) {
        this.currentUser = this.userService.currentUser;
      }
    });
  }

}
