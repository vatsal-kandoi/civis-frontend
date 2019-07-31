import { Component, OnInit, EventEmitter } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { SignUpMutation, CitiesSearchQuery } from './sign-up.graphql';
import {debounceTime, distinctUntilChanged, map, switchMap, takeWhile, tap} from 'rxjs/operators';
import { TokenService } from 'src/app/shared/services/token.service';
import { ErrorService } from 'src/app/shared/components/error-modal/error.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signupObject = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    cityId: null,
    notifyForNewConsultation: false,
    agreedForTermsCondition: false,
  };
  searchEmitter: EventEmitter<any> = new EventEmitter();
  loadingCities: boolean;
  cities: any;
  dropdownText = 'Begin Typing'


  constructor(private apollo: Apollo,
              private tokenService: TokenService,
              private errorService: ErrorService,
              private userService: UserService,
              private router: Router) { }

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


  submit(isValid: boolean) {
    if (!isValid) {
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

}
