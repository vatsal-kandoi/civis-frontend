import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import {filter, take} from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @ViewChild('menuModal') menuModal;
  showNav = true;
  currentUrl: any;
  currentUser: any;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
  this.router.events.subscribe(event => {
    if (event instanceof NavigationEnd) {
      this.currentUrl = this.findUrl(event.url);
      console.log(this.currentUrl);
    }
  });
  this.getCurrentUser();
  }

  openMenu() {
    this.menuModal.show();
  }

  closeMenu() {
    this.menuModal.hide();
  }

  findUrl(url) {
    if (url === '/') {
      return 'landing';
    }
    if (url.search('auth') !== -1) {
      return 'auth';
    }
      return '';
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
        console.log(this.currentUser);
      }
    });
  }



}
