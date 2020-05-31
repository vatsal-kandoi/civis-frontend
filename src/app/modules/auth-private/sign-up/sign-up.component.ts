import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { SignUpMutation, CitiesSearchQuery, LocationListQuery } from './sign-up.graphql';
import {debounceTime, distinctUntilChanged, map, switchMap, takeWhile, tap} from 'rxjs/operators';
import { TokenService } from 'src/app/shared/services/token.service';
import { ErrorService } from 'src/app/shared/components/error-modal/error.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { GraphqlService } from 'src/app/graphql/graphql.service';
import { NgForm } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import gql from 'graphql-tag';

const ResendEmailConfirmationMutation = gql`
  mutation resendEmail($email: String!) {
    authResendVerificationEmail(email: $email)
  }
`;

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
    agreedForTermsCondition: false,
    company: '',
    designation: ''
  };
  searchEmitter: EventEmitter<any> = new EventEmitter();
  loadingCities: boolean;
  cities: any;
  dropdownText = 'Begin Typing';
  reCAPTCHA_KEY: string;
  isCaptchaResolved: boolean;
  nextScreen:boolean = false;
  currentUser:any;
  

  constructor(private apollo: Apollo,
              private tokenService: TokenService,
              private errorService: ErrorService,
              private userService: UserService,
              private router: Router,
              private graphqlService: GraphqlService,
              private cookieService: CookieService,
              ) {
  this.reCAPTCHA_KEY = this.graphqlService.environment.RECAPTCHA_SITE_KEY;
  }

  ngOnInit() {
    this.subscribeToSearch();
  }
  nextPage(){
    if (!this.signupForm.valid) {
      return;
    } else {
      this.nextScreen = true;
    }
    
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
  getCurrentUser(){
    this.userService.userLoaded$
    .subscribe((exists: boolean) => {
      if (exists) {
        this.currentUser = this.userService.currentUser;
      }
    },
    err => {
      this.errorService.showErrorModal(err);
    });
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
            q: name,
            type: 'city'
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
      delete signupObject['designation'];
      delete signupObject['company'];
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
          this.getCurrentUser();
          this.sendEmailVerification();
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

  sendEmailVerification() {
    const variables = {
      email: this.currentUser.email
    };
    this.apollo.mutate({mutation: ResendEmailConfirmationMutation, variables: variables})
    .subscribe ((res) => {
      if (res) {
        this.router.navigate(['/auth-private','verify-email']);
      }
    }, err => {
      this.errorService.showErrorModal(err);
    });
  }

  loadCities() {
    this.loadingCities = true;
    this.apollo.query({
      query: LocationListQuery,
      variables: {
        type: 'city'
      }
    })
    .pipe(
      map((res: any) => res.data.locationList)
    )
    .subscribe((cities) => {
      this.loadingCities = false;
      this.cities = cities;
    }, err => {
      this.loadingCities = false;
      this.errorService.showErrorModal(err);
    });
  }

  captchaResolved(event) {
    this.isCaptchaResolved = true;
    if (this.signupForm.valid) {
      this.submit();
    }
  }

}
