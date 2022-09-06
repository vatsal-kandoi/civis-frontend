import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ErrorService } from '../components/error-modal/error.service';
import { LoginForm, SignupForm } from '../interfaces';
import { TokenService } from './token.service';
import { UserService } from './user.service';
import { CookieService } from 'ngx-cookie';
import { LoginMutation, ResendEmailConfirmationMutation, SignUpMutation } from 'src/app/graphql/mutations';
import { CaseStudiesListQuery } from 'src/app/modules/auth/auth.graphql';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser: any;

  constructor(
    private apollo: Apollo,
    private tokenService: TokenService,
    private errorService: ErrorService,
    private userService: UserService,
    private router: Router,
    private cookieService: CookieService
  ) {}


  /**
   * Log-in user to the Civis platform
   * @param loginData LoginForm
   */
  loginUser(loginData: LoginForm) {
    this.apollo.mutate({
      mutation: LoginMutation,
      variables: {auth: loginData}
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
          this.handleUserToken();
        }
      }, (err: any) => {
        this.errorService.showErrorModal(err);
      });
  }

  /**
   * Sign-up user to the Civis platform
   * @param signupData SignupForm
   */
  signupUser(signupData: SignupForm) {
    const signupObject = {...signupData};
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
          this.handleUserToken();
          this.userService.userLoaded$
          .subscribe((exists: boolean) => {
            if (exists) {
              this.currentUser = this.userService.currentUser;
              this.sendEmailVerification(this.currentUser);
            }
          }, err => {
            this.errorService.showErrorModal(err);
          });
        }
      }, err => {
        this.errorService.showErrorModal(err);
      });
  }

  /**
   * Send e-mail verification to the user on sign-up when they not use
   * the social login option
   * @param object 
   */
  sendEmailVerification(currentUser: any) {
    const variables = {
      email: currentUser.email,
    };
    this.apollo.mutate({mutation: ResendEmailConfirmationMutation, variables: variables})
      .subscribe ((res) => {
        if (res) {
          this.router.navigate(['/auth', 'verify-email']);
        }
      }, err => {
        this.errorService.showErrorModal(err);
      });
  }  

  /**
   * Store the user token
   */
  handleUserToken() {
    this.tokenService.tokenHandler();
    this.userService.manageUserToken();
  }

  getCaseStudiesList() {
    const variables = {
      sort: 'created_at',
      sortDirection: 'desc'
    };
    return this.apollo.query({
      query: CaseStudiesListQuery,
      variables: variables
    })
    .pipe(
      map((res: any) => res.data.caseStudyList)
    );
  }

}
