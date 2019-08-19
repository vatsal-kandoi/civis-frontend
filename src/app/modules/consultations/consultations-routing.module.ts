import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateConsultationComponent } from './create-consultation/create-consultation.component';
import { ConsultationListComponent } from './consultation-list/consultation-list.component';
import { ConsultationProfileComponent } from './consultation-profile/consultation-profile.component';
import { ConsultationsSummaryComponent } from './consultations-summary/consultations-summary.component';

const routes: Routes = [
    { path: 'new', component: CreateConsultationComponent },
    { path: 'list', component: ConsultationListComponent},
    { path: ':id', component: ConsultationProfileComponent},
    { path: ':id/summary' , component: ConsultationsSummaryComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    declarations: [],
    providers: []
})
export class ConsultationsRoutingModule { }
