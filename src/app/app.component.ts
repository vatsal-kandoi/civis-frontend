import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UserService } from './shared/services/user.service';
import { filter } from 'rxjs/operators';
import { StarterService } from './shared/services/starter.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'civis';
  showCitySelection: boolean;
  constructor(
    private userService: UserService,
    private router: Router,
    private starterService: StarterService,
  ) {
    this.starterService.loadGoogleAnalyticsSupport();
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
         window.scrollTo(0, 0);
      }
    });
    this.checkCityPresent();
  }


  checkCityPresent() {
    this.userService.forceCitySelection$
    .pipe(
      filter((data) => data !== null)
    )
    .subscribe(res => {
      if (res) {
        this.showCitySelection = true;
      }
    });
  }

}
