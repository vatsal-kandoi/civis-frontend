import {Directive, Input, OnDestroy, OnInit} from '@angular/core';
import {NgControl} from '@angular/forms';
import {map, takeWhile} from 'rxjs/operators';

@Directive({
  selector: '[appLimitTo]'
})
export class LimitToDirective implements OnInit, OnDestroy {

  @Input() limit: number;
  isAlive = true;

  constructor(private ngControl: NgControl) {
  }

  ngOnInit() {
    const ctrl = this.ngControl.control;

    ctrl.valueChanges
      .pipe(
        map(v => (v || '').toString().slice(0, this.limit)),
        takeWhile(() => this.isAlive)
      )
      .subscribe(v => ctrl.setValue(v, {emitEvent: false}));
  }

  ngOnDestroy() {
    this.isAlive = false;
  }
}
