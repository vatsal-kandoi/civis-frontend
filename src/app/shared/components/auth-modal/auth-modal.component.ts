import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { GraphqlService } from 'src/app/graphql/graphql.service';
import { LoginForm, SignupForm } from '../../interfaces';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.scss']
})
export class AuthModalComponent implements OnInit {

  @ViewChild('authModal', { static: false }) authModal: ModalDirective;
  @Output() close: EventEmitter<any> = new EventEmitter();

  signupObject = {
    firstName: '',
    email: '',
    password: '',
    notifyForNewConsultation: true,
    agreedForTermsCondition: false,
    cityId: null
  };
  signup = false;
  signin = false;
  login = false;
  loginObject = {
    email: '',
    password: ''
  };
  loadingCities: boolean;
  cities: any;
  @Input() consultationId;


  constructor(
    private graphqlService: GraphqlService,
    private authService: AuthService
  ) { }

  ngOnInit() { }

  submitSignupForm($event: SignupForm) {
    if (!$event) return;
    this.authService.signupUser($event);
    this.onClose();
  }

  submitLoginForm($event: LoginForm) {
    if (!$event) return;
    this.authService.loginUser($event);
    this.onClose();
  }

  onClose() {
    this.authModal.hide();
    this.close.emit(true);
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
}
