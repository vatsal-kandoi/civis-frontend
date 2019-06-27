import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()

export class LinearLoaderService {

  toggle$: Subject<boolean> = new Subject();

  constructor() {
   }

  show() {
    this.toggle$.next(true);
  }

  hide() {
    this.toggle$.next(false);
  }
}
