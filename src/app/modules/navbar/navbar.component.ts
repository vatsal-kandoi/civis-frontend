import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';

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
  transparentNav = false;

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
    .subscribe((data) => {
      if (data) {
        this.currentUser = this.userService.currentUser;
      } else {
        this.currentUser = null;
      }
    });
  }

  showProfilePopup() {
    this.profilePopup = !this.profilePopup;
  }


  logout(event) {
    event.stopPropagation();
    this.profilePopup = false;
    localStorage.removeItem('civis-token');
    this.userService.currentUser = null;
    this.userService.userLoaded$.next(false);
    this.router.navigate(['']);
  }
  
  @HostListener('window:scroll', [])
	scrollPos() {
    let number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
		if (number < 150) {
      this.transparentNav = false;
		} else if (number > 150) {
			this.transparentNav = true;
		}
  }
}
