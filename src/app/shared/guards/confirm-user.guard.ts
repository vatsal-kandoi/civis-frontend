import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from '../services/user.service';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { ErrorService } from '../components/error-modal/error.service';
import { TokenService } from '../services/token.service';
import { map } from 'rxjs/operators';


const ConfirmEmailMutation = gql`
    mutation confirmEmail($confirmationToken: String!) {
        authConfirmEmail (confirmationToken: $confirmationToken) {
            accessToken
        }
    }
`;

@Injectable()
export class ConfirmUserGuard implements CanActivate {

  constructor(
    private router: Router,
    private userService: UserService,
    private apollo: Apollo,
    private errorService: ErrorService,
    private tokenService: TokenService,
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : any {
    return Observable.create((observer) => {
        const token = route.queryParams.token;
        const variables = {
            confirmationToken: token
        };
        this.apollo.mutate({mutation: ConfirmEmailMutation, variables: variables})
        .pipe(
            map((res: any) => res.data.authConfirmEmail)
        )
        .subscribe((tokenObj) => {
            if (tokenObj) {
                this.tokenService.storeToken(tokenObj);
                this.router.navigateByUrl('/profile');
                this.tokenService.tokenHandler();
                this.userService.manageUserToken();
            }
        }, err => {
            this.errorService.showErrorModal(err);
        });
    });
  }
}
