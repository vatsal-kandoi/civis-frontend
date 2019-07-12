import { NgModule } from '@angular/core';
import { CreateConsultationComponent } from './create-consultation/create-consultation.component';
import { CommonModule } from '@angular/common';
import { ConsultationsRoutingModule } from './consultations-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        ConsultationsRoutingModule,
        FormsModule,
    ],
    exports: [],
    declarations: [CreateConsultationComponent],
    providers: []
})
export class ConsultationsModule { }
