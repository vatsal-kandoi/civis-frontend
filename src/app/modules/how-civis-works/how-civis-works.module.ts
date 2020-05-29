import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HowCivisWorksComponent } from './how-civis-works.component';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';

const routes: Routes = [
  {
    path: '',
    component: HowCivisWorksComponent
  }
];

@NgModule({
  declarations: [
    HowCivisWorksComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedComponentsModule
  ],
  exports: [RouterModule],
})
export class HowCivisWorksModule { }
