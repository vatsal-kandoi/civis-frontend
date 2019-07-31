import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
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
  profilePopup = false;
  routerId: any;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = this.findUrl(event.url);
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
    if (url.search('/consultations') !== -1) {

      if (url.search('/consultations/new') !== -1) {
        return 'consultations-new';
      }
      if (url.search('/consultations/list') !== -1) {
        return 'consultations-list';
      }
        
      return 'consultations-profile';
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
      }
    });
  }
  
  showProfilePopup() {
    this.profilePopup = !this.profilePopup;
  }

  logout() {
    localStorage.removeItem('civis-token');
    this.router.navigate(['']);
    this.userService.currentUser = null;
    this.userService.userLoaded$.next(false);
  }

}
