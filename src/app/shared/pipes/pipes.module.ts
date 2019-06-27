import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeHtmlPipe } from './safe-html.pipe';
import { JoinPipe } from './join.pipe';
import { TitleizePipe } from './titleize.pipe';

@NgModule({
  declarations: [
    SafeHtmlPipe,
    JoinPipe,
    TitleizePipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
