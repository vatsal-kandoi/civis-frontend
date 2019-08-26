import { Component, OnInit, Input, HostListener, ViewChild, ElementRef } from '@angular/core';
import * as moment from 'moment';
import { ConsultationsService } from 'src/app/shared/services/consultations.service';
import { UserService } from 'src/app/shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements OnInit {

  @ViewChild('shareOptionsElement', { static: false }) shareOptionsElement: ElementRef;
  @ViewChild('spreadButtonElement', { static: false }) spreadButtonElement: ElementRef;

  @Input() profile: any;
  @Input() summaryData: any;

  enableSubmitResponse: boolean;
  currentUser: any;
  showShareOptions: boolean;
  currentUrl = '';

  constructor(private consultationsService: ConsultationsService,
              private userService: UserService,
              private router: Router ) { }

  ngOnInit() {
      this.currentUrl = this.router.url;
      this.CheckSubmitResponseEnabled();
      this.getCurrentUser();
  }

  getCurrentUser() {
    this.userService.userLoaded$
    .subscribe((data) => {
      if (data) {
        this.currentUser = this.userService.currentUser;
      } else {
        this.currentUser = null;
      }
    });
  }

  @HostListener('document:click', ['$event.target'])
  onClick(targetElement) {
    if (this.showShareOptions) {
      if (this.shareOptionsElement.nativeElement.contains(targetElement) ||
          this.spreadButtonElement.nativeElement.contains(targetElement)) {
            return;
      } else {
        this.showShareOptions = false;
      }
    }
  }

  getRemainigDays(deadline) {
    const today = moment();
    const lastDate = moment(deadline);
    const difference = lastDate.diff(today, 'days');
    if (difference <= 0) {
      return 'Closed';
    } else {
      return `${difference} Days Remaining`;
    }
  }

  convertDateFormat(date) {
    return moment(date).format('Do MMM YY');
  }

  CheckSubmitResponseEnabled() {
    this.consultationsService.enableSubmitResponse
    .subscribe((value) => {
      if (value) {
        this.enableSubmitResponse = true;
      } else {
        this.enableSubmitResponse = false;
      }
    });
  }

  stepNext(hasResponseSubmited) {
    if (!this.currentUser) {
      this.router.navigateByUrl('/auth');
      return;
    }
    if (!hasResponseSubmited) {
      this.consultationsService.scrollToCreateResponse.next(true);
    }
    if (this.enableSubmitResponse) {
      this.consultationsService.openFeedbackModal.next(true);
    }
  }
}
