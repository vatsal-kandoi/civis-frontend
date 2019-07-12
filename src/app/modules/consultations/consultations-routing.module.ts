import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateConsultationComponent } from './create-consultation/create-consultation.component';

const routes: Routes = [
    { path: '', component: CreateConsultationComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    declarations: [],
    providers: []
})
export class ConsultationsRoutingModule { }
