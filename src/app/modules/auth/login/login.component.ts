import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { LoginMutation } from './login.graphql';
import { TokenService } from 'src/app/shared/services/token.service';
import { Router } from '@angular/router';
import { ErrorService } from 'src/app/shared/components/error-modal/error.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginObject = {
    email: '',
    password: ''
  };

  constructor(private apollo: Apollo,
              private userService: UserService,
              private tokenService: TokenService,
              private errorService: ErrorService,
              private router: Router) { }

  ngOnInit() {
  }

  submit(isValid: boolean) {
    if (!isValid) {
      return;
    }

    this.apollo.mutate({
        mutation: LoginMutation,
        variables: {auth: this.loginObject}
      })
      .pipe(
        map((res: any) => res.data.authLogin)
      )
      .subscribe((tokenObject: any) => {
        console.log(tokenObject);
        if (tokenObject) {
          this.tokenService.storeToken(tokenObject);
          this.router.navigateByUrl('/home');
          this.onLoggedIn();
        }
      }, (err: any) => {
        this.errorService.showErrorModal(err);
      });
  }

  onLoggedIn() {
    this.tokenService.tokenHandler();
    this.userService.manageUserToken();
  }

}
