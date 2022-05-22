import { NgTemplateOutlet } from '@angular/common';
import { Component, OnInit, ViewChild, Output, EventEmitter, Input, TemplateRef, AfterViewInit } from '@angular/core';
import { ModalDirective, BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { GraphqlService } from 'src/app/graphql/graphql.service';
import { LoginForm, SignupForm } from '../../interfaces';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.scss']
})
export class AuthModalComponent implements OnInit, AfterViewInit {

  @ViewChild('authTemplate', { read: TemplateRef } ) authTemplateRef: TemplateRef<any>;
  @Output() close: EventEmitter<any> = new EventEmitter();

  modalRef?: BsModalRef;
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
  isModalInitialised: boolean = false;

  constructor(
    private graphqlService: GraphqlService,
    private authService: AuthService,
    private modalService: BsModalService
  ) { }

  ngAfterViewInit() {
    this.openAuthModal();
  }

  ngOnInit() {
  }

  openAuthModal() {
    console.log(this.authTemplateRef)
    this.modalRef = this.modalService.show(this.authTemplateRef, {
      ariaDescribedby: "modal-description",
      ariaLabelledBy: "modal-heading",
      keyboard: false,
      show: true,
      backdrop: false,
      ignoreBackdropClick: true,
    });
  }

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
    this.modalRef.hide();
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

  switchAuthOption() {
    if (this.signin) {
      this.signin = false;
      this.signup = false;
    } else {
      this.signup = false;
      this.signin = true;
    }
  }
}
