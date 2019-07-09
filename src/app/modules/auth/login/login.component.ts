import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {map} from 'rxjs/operators';
import { LoginMutation } from './login.graphql';
import { TokenService } from 'src/app/shared/services/token.service';
import { Router } from '@angular/router';

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

  constructor(private apollo: Apollo, private tokenService: TokenService, private router: Router) { }

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
      .subscribe((apiToken: any) => {
        if (apiToken) {
          this.tokenService.storeToken(apiToken);
          this.router.navigateByUrl('/home');
        }
      }, (err: any) => {
          console.log(err);
      });
  }

}
