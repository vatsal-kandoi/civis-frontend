import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {filter} from 'rxjs/operators';
import {UserService} from '../services/user.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private userService: UserService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return Observable.create((observer) => {
      this.userService.userLoaded$
        .pipe(
          filter(result => result !== null)
        )
        .subscribe((data: boolean) => {
          if (data && this.userService.currentUser) {
            observer.next(true);
          } else {
            this.router.navigate(['']);
          }
        }, (err) => {
          return this.router.navigate(['']);
        });
    });
  }
}
