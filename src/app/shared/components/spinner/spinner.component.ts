import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-spinner',
  template: `
    <div class="row" [ngClass]="{'h-100v' : fullHeight, 'h-100': h100}">
      <div class="col-12 d-flex justify-content-center align-items-center">
        <div class="spinner" [ngStyle]="spinnerStyle">
          <div class="circle circle-1" [ngStyle]="circle1Style"></div>
          <div class="circle circle-2" [ngStyle]="circle2Style"></div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  
  constructor() {
  }
  
  @Input() size = 50;
  @Input() animationDuration = 750;
  @Input() color = '#0095FF';
  @Input() fullHeight = false;
  @Input() h100 = false;
  
  get spinnerStyle() {
    return {
      height: `${this.size}px`,
      width: `${this.size}px`
    };
  }
  
  get circleStyle() {
    return {
      borderWidth: `${this.size / 10}px`,
      animationDuration: `${this.animationDuration}ms`
    };
  }
  
  get circle1Style() {
    return {
      ...this.circleStyle,
      borderTopColor: this.color
    };
  }
  
  get circle2Style() {
    return {
      ...this.circleStyle,
      borderBottomColor: this.color
    };
  }
  
  ngOnInit() {
  }
  
}
