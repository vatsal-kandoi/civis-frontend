import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  showToast = new BehaviorSubject(false);
  message = '';
  type = '';

  constructor() {
  }

  displayToast(type: string, message: string) {
    this.message = message;
    this.type = type;
    this.showToast.next(true);
    setTimeout(() => {
      this.showToast.next(false);
    }, 4500);
  }
}
