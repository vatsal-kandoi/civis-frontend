import { Component, Input, OnInit } from '@angular/core';
import { GraphqlService } from 'src/app/graphql/graphql.service';

@Component({
  selector: 'app-social-login-options',
  templateUrl: './social-login-options.component.html',
  styleUrls: ['./social-login-options.component.scss']
})
export class SocialLoginOptionsComponent implements OnInit {
  /** True if the user want's to sign-up. False if user is logging in.
   *  Controls the display options
   */
  @Input() userSignUp: boolean;
  constructor( private graphqlService: GraphqlService, ) { }

  ngOnInit(): void {
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
