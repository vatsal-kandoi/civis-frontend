import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinearLoaderComponent } from './linear-loader.component';

@NgModule({
  imports: [
      CommonModule
    ],
  providers: [
  ],
  exports: [
    LinearLoaderComponent
  ],
  declarations: [
      LinearLoaderComponent
    ]
})
export class LinearLoaderModule { }
