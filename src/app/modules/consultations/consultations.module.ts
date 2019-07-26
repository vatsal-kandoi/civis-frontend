import { NgModule } from '@angular/core';
import { CreateConsultationComponent } from './create-consultation/create-consultation.component';
import { CommonModule } from '@angular/common';
import { ConsultationsRoutingModule } from './consultations-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import {ModalModule} from 'ngx-bootstrap';;
import { NgxUploaderModule } from 'ngx-uploader';



@NgModule({
    imports: [
        CommonModule,
        ConsultationsRoutingModule,
        FormsModule,
        NgSelectModule,
        BsDatepickerModule.forRoot(),
        ModalModule,
        NgxUploaderModule
    ],
    exports: [],
    declarations: [CreateConsultationComponent],
    providers: []
})
export class ConsultationsModule { }
