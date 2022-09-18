import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { distinctUntilChanged, debounceTime, map, takeWhile, switchMap, tap } from 'rxjs/operators';
import { GraphqlService } from 'src/app/graphql/graphql.service';
import { LocationListQuery } from 'src/app/modules/auth-private/sign-up/sign-up.graphql';
import { SignupForm } from '../../interfaces';
import { CitiesService } from '../../services/cities.service';
import { CitiesSearchQuery } from '../city-selection-modal/city-selection-modal.graphql';
import { ErrorService } from '../error-modal/error.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent implements OnInit, AfterViewInit {

  @Input() showCityInputOption: boolean = false;
  @Input() triggerFocusToFirstElement: boolean = false;
  @Output() onSubmit: EventEmitter<SignupForm> = new EventEmitter(null);

  @ViewChild('signupForm', {static: false}) signupForm: NgForm;
  @ViewChild('signupForm', { read: ElementRef }) signupFormElemRef: ElementRef;  
  @ViewChild('captchaRef', {static: false}) captchaRef;
  signupObject: SignupForm = {
    firstName: '',
    email: '',
    password: '',
    notifyForNewConsultation: true,
    agreedForTermsCondition: false,
  };
  searchEmitter: EventEmitter<any> = new EventEmitter();
  loadingCities: boolean;
  cities: any;
  dropdownText = 'Begin Typing';
  reCAPTCHA_KEY: string;
  isCaptchaResolved: boolean;
  currentUser: any;
  invitationToken: string;

  constructor( private citiesService: CitiesService, 
               private apollo: Apollo,
               private errorService: ErrorService,
               private graphqlService: GraphqlService, ) {
    this.reCAPTCHA_KEY = this.graphqlService.environment.RECAPTCHA_SITE_KEY;
  }

  ngOnInit() {
    this.subscribeToSearch();
  }

  ngAfterViewInit(): void {
    if(this.triggerFocusToFirstElement) {
      ((this.signupFormElemRef.nativeElement.getElementsByClassName('input-box__border')[0] as HTMLElement).firstChild as HTMLElement).focus();
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
            return this.citiesService.searchCity(data.term);
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

  submitSignupForm() {
    if (!this.signupForm.valid) {
      this.signupFormElemRef.nativeElement.querySelector('.ng-invalid').focus();
      return; 
    }
    // Proces form only on captcha resolved
    this.onSubmit.emit(this.signupObject);
    // TODO enable captcha when live 
    //else if (this.isCaptchaResolved) this.onSubmit.emit(this.signupObject);
    //else if (!this.captchaRef.executeRequested) {
      //this.captchaRef.execute();
    //}
  }

  loadCities() {
    this.loadingCities = true;
    this.citiesService.getCities()
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
    this.submitSignupForm();
  }
}
