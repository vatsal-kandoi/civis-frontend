import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {LimitToDirective} from './limit-to.directive';
import {SearchInputDirective} from './search-input.directive';
import { InfiniteScrollDirective } from './infinite-scroll.directive';
import { LazyLoadDirective } from './lazy-load.directive';
import { DefaultImageDirective } from './default-image.directive';


@NgModule({
  declarations: [
    LimitToDirective,
    SearchInputDirective,
    InfiniteScrollDirective,
    LazyLoadDirective,
    DefaultImageDirective,
  ],
  exports: [
    LimitToDirective,
    SearchInputDirective,
    InfiniteScrollDirective,
    LazyLoadDirective,
    DefaultImageDirective,
  ],
  imports: [
    CommonModule
  ]
})
export class SharedDirectivesModule {
}
