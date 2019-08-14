import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { Routes, RouterModule } from '@angular/router';
import { ContentPolicyComponent } from './content-policy/content-policy.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';

const routes: Routes = [
  {
    path: 'content-policy',
    component: ContentPolicyComponent
  }
];

@NgModule({
  declarations: [TermsOfServiceComponent, ContentPolicyComponent, PrivacyPolicyComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedComponentsModule
  ],
  exports: [
    TermsOfServiceComponent
  ]
})

export class PolicyModule { }
