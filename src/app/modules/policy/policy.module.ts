import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { Routes, RouterModule } from '@angular/router';
import { ContentPolicyComponent } from './content-policy/content-policy.component';

const routes: Routes = [
  {
    path: 'terms-of-service',
    component: TermsOfServiceComponent
  },
  {
    path: 'content-policy',
    component: ContentPolicyComponent
  }
];

@NgModule({
  declarations: [TermsOfServiceComponent, ContentPolicyComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedComponentsModule
  ]
})

export class PolicyModule { }
