import {
  trigger,
  style,
  animate,
  transition,
  query,
  stagger
} from '@angular/animations';

export const listStagger: any = trigger('listStagger', [
  transition('* <=> *', [
    query(
      ':enter',
      [
        style({opacity: 0, transform: 'translateY(50px)'}),
        stagger(
          '80ms',
          animate(
            '550ms cubic-bezier(0.075, 0.82, 0.165, 1)',
            style({opacity: 1, transform: 'translateY(0px)'})
          )
        )
      ],
      {optional: true}
    ),
    query(':leave', animate('50ms', style({opacity: 0})), {
      optional: true
    })
  ])
]);
