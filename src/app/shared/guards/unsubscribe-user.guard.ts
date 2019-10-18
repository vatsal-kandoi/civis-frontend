import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from '../services/user.service';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { ErrorService } from '../components/error-modal/error.service';
import { map } from 'rxjs/operators';
import { ToastService } from '../components/toast/toast.service';


const UnsbscribeConsultationNotificationMutation = gql`
    mutation unsubscribeConsultation($unsubscribeToken: String!) {
        unsubscribeConsultation(unsubscribeToken: $unsubscribeToken)
    }
`;

@Injectable()
export class UnsubscribeUserGuard implements CanActivate {

  constructor(
    private router: Router,
    private userService: UserService,
    private apollo: Apollo,
    private errorService: ErrorService,
    private toastService: ToastService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : any {
    return Observable.create((observer) => {
        const token = route.queryParams.unsubscribe_token;
        const variables = {
            unsubscribeToken: token
        };
        this.apollo.mutate({mutation: UnsbscribeConsultationNotificationMutation, variables: variables})
        .pipe(
            map((res: any) => res.data.unsubscribeConsultation)
        )
        .subscribe((tokenObj) => {
            this.router.navigateByUrl('/');
            this.toastService.displayToast('success', 'Your Successfully Unsubscribed');
        }, err => {
            this.errorService.showErrorModal(err);
        });
    });
  }
}
