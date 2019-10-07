import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { ForgotPasswordMutation, ResetPasswordMutation } from './forgot-password.graphql';
import { ErrorService } from 'src/app/shared/components/error-modal/error.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotObject = {
    email: ''
  };
  resetObject = {
    newPassword: '',
    confirmPassword: ''
  };
  resetPasswordToken: any;
  passwordMismatch: boolean;
  loading: boolean;

  constructor(private apollo: Apollo,
              private errorService: ErrorService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
                this.activatedRoute.queryParams
                .subscribe((queryParams: any) => {
                  if (queryParams) {
                    this.resetPasswordToken = queryParams.reset_password_token;
                  }
                });
               }

  ngOnInit() {
  }

  submit(isValid: boolean) {
    if (!isValid) {
      return;
    }
    this.loading = true;
    this.apollo.mutate({
        mutation: ForgotPasswordMutation,
        variables: {
          email: this.forgotObject.email
        }
      })
      .pipe(
        map((res: any) => res.data.authForgotPassword)
      )
      .subscribe((token: any) => {
        this.loading = false;
      }, (err: any) => {
        this.loading = false;
        this.errorService.showErrorModal(err);
      });
  }

  reset(resetForm) {
    if (!resetForm.valid) {
      return;
    }
    resetForm = resetForm.value;
    if (resetForm.newPassword !== resetForm.confirmPassword) {
      this.passwordMismatch = true;
      return;
    } else {
      this.passwordMismatch = false;
    }
    this.loading = true;
    this.apollo.mutate({
      mutation: ResetPasswordMutation,
      variables: {
        auth : {
          password: resetForm.newPassword,
          resetPasswordToken: this.resetPasswordToken
        }
      }
    })
    .pipe(
      map((res: any) => res.data.authResetPassword)
    )
    .subscribe((token: any) => {
      this.loading = false;
      this.router.navigateByUrl('auth/login');
    }, (err: any) => {
      this.loading = false;
      this.errorService.showErrorModal(err);
    });
  }
}
