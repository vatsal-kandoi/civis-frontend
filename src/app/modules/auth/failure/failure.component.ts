import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-failure',
  template: `
  <div class="w-100">
  <p class="text-center mt-5">
    There was a problem signing you in the platform. Click <a [routerLink]="['/']">here</a> to go to the platform and try again.
  </p>
</div>
  `,
  styleUrls: ['./failure.component.scss']
})
export class FailureComponent implements OnInit {

  constructor(
  ) { }

  ngOnInit() {
  }

}
