import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultationCardComponent } from './consultation-card.component';

@NgModule({
  declarations: [ConsultationCardComponent],
  imports: [
    CommonModule
  ],
  exports: [
    ConsultationCardComponent,
  ]
})
export class ConsultationCardModule { }
