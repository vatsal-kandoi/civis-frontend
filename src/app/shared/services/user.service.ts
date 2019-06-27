import { Injectable } from '@angular/core';
import {Apollo} from 'apollo-angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  userDataLoading = new BehaviorSubject(null);
  currentUser: any;

  constructor(
    private apollo: Apollo,
  ) { }

  getCurrentUser() {
    
  }

}
