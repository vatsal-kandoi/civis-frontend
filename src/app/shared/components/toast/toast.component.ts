import {Component, OnInit} from '@angular/core';
import {ToastService} from './toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
  message = '';
  type = 'success';
  isToastShown = false;

  constructor(
    private toastService: ToastService
  ) {
  }

  ngOnInit() {
    this.toastService.showToast
      .subscribe((data: boolean) => {
        this.isToastShown = data;
        this.message = this.toastService.message;
        this.type = this.toastService.type;
      });
  }

}
