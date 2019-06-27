import {animate, style, transition, trigger} from '@angular/animations';

export const flyUp: any = trigger('flyUp', [
  transition(':enter', [
    style({transform: 'translateY(100%)'}),
    animate('0.3s cubic-bezier(1,0,0,1)', style({transform: 'translateY(0)'}))
  ]),
  transition(':leave', [
    style({transform: 'translateY(0)'}),
    animate('0.3s cubic-bezier(1,0,0,1)', style({transform: 'translateY(-100%)'}))
  ])
]);
