import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {LimitToDirective} from './limit-to.directive';
import {SearchInputDirective} from './search-input.directive';
import { InfiniteScrollDirective } from './infinite-scroll.directive';
import { LazyLoadDirective } from './lazy-load.directive';


@NgModule({
  declarations: [
    LimitToDirective,
    SearchInputDirective,
    InfiniteScrollDirective,
    LazyLoadDirective
  ],
  exports: [
    LimitToDirective,
    SearchInputDirective,
    InfiniteScrollDirective,
    LazyLoadDirective
  ],
  imports: [
    CommonModule
  ]
})
export class SharedDirectivesModule {
}
