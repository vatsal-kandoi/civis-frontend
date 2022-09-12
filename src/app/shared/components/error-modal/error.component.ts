import {AfterViewInit, Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {ErrorService} from './error.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit, AfterViewInit {

  showModal: boolean;
  error: any;
  customMessage: string;
  shouldReload: boolean;

  constructor(
    private errorService: ErrorService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.errorService.showModal
      .subscribe(data => {
        if (data) {
          if (this.errorService.customMessage) {
            this.customMessage = this.errorService.customMessage;
          }
          this.error = this.errorService.error;
          this.showModal = true;
          this.shouldReload = this.errorService.shouldReload;
        } else {
          this.showModal = false;
          this.error = null;
          this.customMessage = null;
          this.shouldReload = false;
        }
      });
  }

  ngAfterViewInit(): void {
    (document.getElementsByClassName('response-alert')[0] as HTMLElement).focus();
  }

  close() {
    this.showModal = false;
    if (this.shouldReload) {
      window.location.href = '/auth';
    }
  }

  onHidden() {
    this.errorService.hideErrorModal();
  }
}
