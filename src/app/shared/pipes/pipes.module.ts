import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeHtmlPipe } from './safe-html.pipe';
import { JoinPipe } from './join.pipe';
import { TitleizePipe } from './titleize.pipe';
import { TranslatePipe } from './translate.pipe';

@NgModule({
  declarations: [
    SafeHtmlPipe,
    JoinPipe,
    TitleizePipe,
    TranslatePipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TranslatePipe,
    SafeHtmlPipe
  ]
})
export class PipesModule { }
