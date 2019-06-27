import {animate, style, transition, trigger} from '@angular/animations';

export const scaleOut: any = trigger('scaleOut', [
  transition(':leave', [
    style({transform: 'scale(1)'}),
    animate('0.2s', style({transform: 'scale(0)'}))
  ])
]);

export const scaleBig: any = trigger('scaleBig', [
  transition(':enter', [
    style({transform: 'scale(0)'}),
    animate('0.2s cubic-bezier(1,0,0,1)', style({transform: 'scale(4)'}))
  ]),
  transition(':leave', [
    style({transform: 'scale(4)'}),
    animate('0.2s cubic-bezier(1,0,0,1)', style({transform: 'scale(0)'}))
  ])
]);
