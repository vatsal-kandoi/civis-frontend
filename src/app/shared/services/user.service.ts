import { ToastService } from 'src/app/shared/components/toast/toast.service';
import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {BehaviorSubject} from 'rxjs';
import {filter, map, take} from 'rxjs/operators';
import {CurrentUser} from '../../graphql/queries.graphql';
import {TokenService} from './token.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  token: string;
  userLoaded$ = new BehaviorSubject(null);
  forceCitySelection$ = new BehaviorSubject(null);
  currentUser: any;

constructor(
  private apollo: Apollo,
  private tokenService: TokenService,
  private toastService: ToastService,
) {
  this.manageUserToken();
}

  manageUserToken() {
    this.tokenService.hasToken$
      .pipe(
        take(1),
        filter(value => value !== null)
      )
      .subscribe((data: any) => {
        if (!data) {
          this.token = '';
          this.userLoaded$.next(false);
          return;
        } else {
          this.token = this.tokenService.token;
          this.getCurrentUser();
        }
      });
  }

  getCurrentUser() {
    this.apollo.query({
        query: CurrentUser,
        variables: {},
        fetchPolicy: 'network-only'
      })
      .pipe(
        map((res: any) => res.data.userCurrent)
      )
      .subscribe((user: any) => {
        if (user) {
          this.currentUser = user;
          this.userLoaded$.next(true);
          if (!this.currentUser.city || !this.currentUser.city.id) {
            this.forceCitySelection$.next(true);
          }
        } else {
          console.error('User not found');
        }
      }, (err: any) => {
        console.error('Error fetching user', err);
        this.userLoaded$.next(false);
        this.toastService.displayToast('error', err);
      });
  }
}

