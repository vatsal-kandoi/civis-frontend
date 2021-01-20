import { CookieService } from 'ngx-cookie';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { UserService } from './shared/services/user.service';
import { filter } from 'rxjs/operators';
import { StarterService } from './shared/services/starter.service';
import { Subscription } from 'rxjs';
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "civis";
  showCitySelection: boolean;
  paramsSubscription: Subscription;
  selectedLanguage = 'en';
  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private starterService: StarterService,
    private _cookieService: CookieService
  ) {
    this.starterService.loadGoogleAnalyticsSupport();
    const currentLanguage = this._cookieService.get("civisLang");
    if (currentLanguage) {
      this.selectedLanguage = currentLanguage;
    }
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
    this.checkCityPresent();
    this.checkLang();
  }

  checkLang() {
    this.paramsSubscription = this.route.queryParams.subscribe((params) => {
      if (params.lang) {
        const langReq = params["lang"];
        if (this.selectedLanguage !== langReq) {
          confirm(`Are you sure you want to change the language to ${langReq === 'en' ? 'English' : 'Hindi'}`)
            ? ((this.selectedLanguage = langReq), this.setLanguage())
            : console.log("good for you");
        }
      }
    });
  }

  setLanguage() {
    this._cookieService.put("civisLang", this.selectedLanguage);
    window.location.reload();
    window.scrollTo(0, 0);
  }

  checkCityPresent() {
    this.userService.forceCitySelection$
      .pipe(filter((data) => data !== null))
      .subscribe((res) => {
        if (res) {
          this.showCitySelection = true;
        }
      });
  }
}
