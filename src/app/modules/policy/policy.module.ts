import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'terms-of-service',
    component: TermsOfServiceComponent
  }
];

@NgModule({
  declarations: [TermsOfServiceComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedComponentsModule
  ]
})

export class PolicyModule { }
