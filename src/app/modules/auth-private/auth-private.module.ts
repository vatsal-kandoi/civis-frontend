import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthPrivateRoutingModule } from './auth-private-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { RecaptchaModule } from 'ng-recaptcha';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SuccessComponent } from '../auth/success/success.component';
import { FailureComponent } from '../auth/failure/failure.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AuthPrivateRoutingModule,
    NgSelectModule,
    FormsModule,
    RecaptchaModule
  ],
  declarations: [
    SignUpComponent,
    LoginComponent,
    SuccessComponent,
    FailureComponent,
    ForgotPasswordComponent
  ]
})
export class AuthPrivateModule { }
