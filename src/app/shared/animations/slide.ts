import {animate, style, transition, trigger} from '@angular/animations';

export const slideIn: any = trigger('slideIn', [
  transition(':enter', [
    style({transform: 'translateY(-80px)'}),
    animate('0.3s cubic-bezier(1,0,0,1)', style({transform: 'translateY(2px)'}))
  ]),
  transition(':leave', [
    style({transform: 'translateY(2px)'}),
    animate('0.3s cubic-bezier(1,0,0,1)', style({transform: 'translateY(-80px)'}))
  ])
]);

export const slideInRight: any = trigger('slideInRight', [
  transition(':enter', [
    style({transform: 'translateX(-100%)'}),
    animate('0.2s cubic-bezier(1,0,0,1)', style({transform: 'translateX(0)'}))
  ]),
  transition(':leave', [
    style({transform: 'translateX(0)'}),
    animate('0.2s cubic-bezier(1,0,0,1)', style({transform: 'translateX(100%)'}))
  ]),
]);

export const slideInLeft: any = trigger('slideInLeft', [
  transition(':enter', [
    style({transform: 'translateX(100%)'}),
    animate('0.2s cubic-bezier(1,0,0,1)', style({transform: 'translateX(0)'}))
  ]),
  transition(':leave', [
    style({transform: 'translateX(0)'}),
    animate('0.2s cubic-bezier(1,0,0,1)', style({transform: 'translateX(-100%)'}))
  ]),
]);

export const slideUp: any = trigger('slideUp', [
  transition(':enter', [
    style({transform: 'translateY(80px)'}),
    animate('0.3s cubic-bezier(1,0,0,1)', style({transform: 'translateY(-2px)'}))
  ]),
  transition(':leave', [
    style({transform: 'translateY(-2px)'}),
    animate('0.3s cubic-bezier(1,0,0,1)', style({transform: 'translateY(80px)'}))
  ])
]);

export const slideInFade: any = trigger('slideInFade', [
  transition(':enter', [
    style({transform: 'translateY(80px)', opacity: 0}),
    animate('.2s ease-in', style({transform: 'translateY(0px)', opacity: 1}))
  ]),
  transition(':leave', [
    style({transform: 'translateY(0px)', opacity: 1}),
    animate('.2s ease-out', style({transform: 'translateY(100px)', opacity: 0}))
  ]),
]);

export const modalSlideIn: any = trigger('modalSlideIn', [
  transition(':enter', [
    style({transform: 'translateX(100%)'}),
    animate('3s cubic-bezier(1,0,0,1)', style({transform: 'translateX(0)'}))
  ]),
  transition(':leave', [
    style({transform: 'translateX(0)'}),
    animate('2s cubic-bezier(1,0,0,1)', style({transform: 'translateX(-100%)'}))
  ]),
]);


