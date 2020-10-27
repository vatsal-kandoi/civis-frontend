import { Component, OnInit, Input, HostListener, ViewChild, ElementRef, ViewEncapsulation, OnDestroy } from '@angular/core';
import * as moment from 'moment';
import { ConsultationsService } from 'src/app/shared/services/consultations.service';
import { UserService } from 'src/app/shared/services/user.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { isObjectEmpty } from 'src/app/shared/functions/modular.functions';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class ProfileCardComponent implements OnInit, OnDestroy {

  @ViewChild('shareOptionsElement', { static: false }) shareOptionsElement: ElementRef;
  @ViewChild('spreadButtonElement', { static: false }) spreadButtonElement: ElementRef;

  @Input() profile: any;
  @Input() summaryData: any;

  enableSubmitResponse: boolean;
  currentUser: any;
  showShareOptions: boolean;
  currentUrl = '';
  showConfirmEmailModal: boolean;

  constructor(private consultationsService: ConsultationsService,
              private userService: UserService,
              private cookieService: CookieService,
              private router: Router ) { }

  ngOnInit() {
      this.currentUrl = window.location.href;
      this.CheckSubmitResponseEnabled();
      this.getCurrentUser();
  }

  ngOnDestroy() {
    this.consultationsService.enableSubmitResponse.next(false);
  }

  downloadReport() {
    window.print();
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
    if (deadline) {
      const diff_in_days = this.getDifferenceInDays(deadline);
      if (diff_in_days <= 0) {
        return diff_in_days === 0 ? 'Last day to respond' : 'Closed';
      } else {
        return `${diff_in_days} Days Remaining`;
      }
    }
  }

  convertDateFormat(date) {
    return moment(date).format('Do MMM YY');
  }

  getDifferenceInDays(deadline) {
    if (deadline) {
      const today = new Date();
      today.setUTCHours(0, 0, 0, 0);
      const lastDate = moment(deadline);
      const diff_in_time = lastDate.valueOf() - today.getTime();
      const diff_in_days = diff_in_time / (1000 * 3600 * 24);
      return diff_in_days;
    }
  }

  getTwitterUrl(link) {
      const diff_in_days = this.getDifferenceInDays(this.profile.responseDeadline);
      let remainingDays = '';
      if (diff_in_days <= 0) {
        remainingDays =  diff_in_days === 0 ? ', last day for you to share your feedback too!' : '.';
      } else {
        remainingDays =  `, only ` + `${diff_in_days} Days Remaining for you to share your feedback too!`;
      }
      const text  = `It’s your turn citizen! I shared my feedback on ` +
      `${this.profile.title}${remainingDays}`;
      const url = `https://twitter.com/intent/tweet?text=${text}&url=${link}`;
      return url;
  }

  getFbUrl(link) {
    if (link) {
      return `https://www.facebook.com/sharer/sharer.php?u=${link}`;
    }
    return null;
  }

  getWhatsappUrl(link) {
    if (link) {
      return `https://api.whatsapp.com/send?text=${link}`;
    }
    return null;
  }

  getLinkedinUrl(link) {
    if (link) {

      return `https://www.linkedin.com/shareArticle?mini=true&url=${link}`;

    }
    return null;
  }

  createCalendarEvent() {
    if (this.profile && this.profile.title && this.profile.responseDeadline) {
      let startDate: any =  new Date(this.profile.responseDeadline).setHours(0, 0, 0);
      startDate = new Date(startDate).toISOString();
      let endDate: any  = new Date(this.profile.responseDeadline).setHours(23, 59, 59);
      endDate = new Date(endDate).toISOString();
      const calendarUrl = `https://calendar.google.com/calendar/r/eventedit?text=` +
      `Civis consultation response deadline- ${this.profile.title}` +
      `&dates=${startDate.split('-').join('').split(':').join('').split('.000').join('')}/` +
      `${endDate.split('-').join('').split(':').join('').split('.000').join('')}` +
      `&details=&sf=true&output=xml`;
      return calendarUrl;
    }
    return '';
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
      this.cookieService.put('loginCallbackUrl', this.router.url);
      return;
    }

    if (this.currentUser && !this.currentUser.confirmedAt) {
      this.showConfirmEmailModal = true;
      return;
    }

    if (!hasResponseSubmited) {
      const questions = this.consultationsService.getQuestions(this.profile);
      if (questions && questions.length) {
        this.consultationsService.validateAnswers.next(true);
        return;
      }
      this.consultationsService.scrollToCreateResponse.next(true);
    }

    if (this.enableSubmitResponse) {
      this.consultationsService.openFeedbackModal.next(true);
    }
  }

}
