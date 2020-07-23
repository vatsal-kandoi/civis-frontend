import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisqusComponent } from './disqus.component';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    DisqusComponent
  ],
  imports: [
    CommonModule,
    PipesModule,
  ],
  exports: [
    DisqusComponent,
  ]
})
export class DisqusModule { }
