import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Error} from './error.constants';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  showModal = new BehaviorSubject(null);
  error: any;
  customMessage: string;
  shouldReload: boolean;

  showErrorModal(error, customMessage?: string, shouldReload?: boolean) {
    if (error) {
      this.error = new Error(error);
    }
    if (customMessage) {
      this.customMessage = customMessage;
    }
    this.showModal.next(true);
    this.shouldReload = shouldReload;
  }

  hideErrorModal() {
    this.error = null;
    this.customMessage = null;
    this.shouldReload = false;
    this.showModal.next(false);
  }
}
