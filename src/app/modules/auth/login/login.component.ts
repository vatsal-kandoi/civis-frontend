import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { LoginMutation } from './login.graphql';
import { TokenService } from 'src/app/shared/services/token.service';
import { Router } from '@angular/router';
import { ErrorService } from 'src/app/shared/components/error-modal/error.service';
import { UserService } from 'src/app/shared/services/user.service';
import { GraphqlService } from 'src/app/graphql/graphql.service';
import { CookieService } from 'ngx-cookie';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('loginForm', {static: false}) loginForm: NgForm;
  @ViewChild('loginForm', { read: ElementRef }) loginFormElemRef: ElementRef;
  loginObject = {
    email: '',
    password: ''
  };

  constructor(private apollo: Apollo,
              private userService: UserService,
              private tokenService: TokenService,
              private errorService: ErrorService,
              private cookieService: CookieService,
              private router: Router,
              private graphqlService: GraphqlService,
              ) { }

  ngOnInit() {}
  
  submit() {
    if (!this.loginForm.valid) this.loginFormElemRef.nativeElement.querySelector('.ng-invalid').focus()
    // Proces form only on captcha resolved
    else {
      this.apollo.mutate({
          mutation: LoginMutation,
          variables: {auth: this.loginObject}
        })
        .pipe(
          map((res: any) => res.data.authLogin)
        )
        .subscribe((tokenObject: any) => {
          if (tokenObject) {
            this.tokenService.storeToken(tokenObject);
            const callbackUrl = this.cookieService.get('loginCallbackUrl');
            if (callbackUrl) {
              this.router.navigateByUrl(callbackUrl);
              this.cookieService.put('loginCallbackUrl', '');
            } else {
              this.router.navigateByUrl('/profile');
            }
            this.onLoggedIn();
          }
        }, (err: any) => {
          this.errorService.showErrorModal(err);
        });
      }
  }

  onLoggedIn() {
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

}
