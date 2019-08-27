import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { SignUpMutation, CitiesSearchQuery } from './sign-up.graphql';
import {debounceTime, distinctUntilChanged, map, switchMap, takeWhile, tap} from 'rxjs/operators';
import { TokenService } from 'src/app/shared/services/token.service';
import { ErrorService } from 'src/app/shared/components/error-modal/error.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { GraphqlService } from 'src/app/graphql/graphql.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  @ViewChild('signupForm', {static: false}) signupForm: NgForm;
  @ViewChild('captchaRef', {static: false}) captchaRef;
  signupObject = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: null,
    password: '',
    cityId: null,
    notifyForNewConsultation: false,
    agreedForTermsCondition: false,
  };
  searchEmitter: EventEmitter<any> = new EventEmitter();
  loadingCities: boolean;
  cities: any;
  dropdownText = 'Begin Typing';
  reCAPTCHA_KEY: string;
  isCaptchaResolved: boolean;


  constructor(private apollo: Apollo,
              private tokenService: TokenService,
              private errorService: ErrorService,
              private userService: UserService,
              private router: Router,
              private graphqlService: GraphqlService,
              ) {
  this.reCAPTCHA_KEY = this.graphqlService.environment.RECAPTCHA_SITE_KEY;
  }

  ngOnInit() {
    this.subscribeToSearch();
  }

  subscribeToSearch() {
    this.searchEmitter
      .pipe(
        distinctUntilChanged(),
        debounceTime(400),
        takeWhile(data => !!data),
        switchMap(data => {
          if (data) {
            this.loadingCities = true;
            return this.searchCity(data.term);
          }
        })
      )
      .subscribe((result) => {
        this.loadingCities = false;
        this.cities = result;
        if (!this.cities.length) {
          this.dropdownText = 'City not found';
        }
      }, (err: any) => this.loadingCities = false);
  }

  onSearch(query: any) {
    if (!query.term) {
      query = null;
      return;
    }
    this.searchEmitter.emit(query);
  }

  searchCity(name: string) {
    if (name.trim()) {
      return this.apollo.query({
          query: CitiesSearchQuery,
          variables: {
            q: name
          }
        })
        .pipe(
          map((i: any) => i.data.locationAutocomplete),
          tap(() => this.loadingCities = false)
        );
    }
  }


  submit() {
    if (!this.signupForm.valid || !this.isCaptchaResolved) {
      return;
    } else {
      const signupObject = {...this.signupObject};
      delete signupObject['agreedForTermsCondition'];
      const variables = {
        auth: signupObject
      };
      this.apollo.mutate({mutation: SignUpMutation, variables: variables})
      .pipe(
        map((res: any) => res.data.authSignUp)
      )
      .subscribe((token) => {
        if (token) {
          this.tokenService.storeToken(token);
          this.router.navigateByUrl('/profile');
          this.onSignUp();
        }
      }, err => {
        this.errorService.showErrorModal(err);
      });
    }
  }

  onSignUp() {
    this.tokenService.tokenHandler();
    this.userService.manageUserToken();
  }

  redirectTo(socialPlatform) {
    switch (socialPlatform) {
      case 'google':
        window.location.href = `${this.graphqlService.environment.api}/signin_google`;
        break;
      case 'facebook':
        window.location.href = `${this.graphqlService.environment.api}/signin_facebook`;
        break;
    }
  }

  checkForCaptcha() {
    if (this.isCaptchaResolved) {
      this.submit();
    } else {
      if (!this.captchaRef.executeRequested) {
        this.captchaRef.execute();
      }
    }
  }

  captchaResolved(event) {
    console.log('event is: ', event);
    this.isCaptchaResolved = true;
    if (this.signupForm.valid) {
      this.submit();
    }
  }

}
