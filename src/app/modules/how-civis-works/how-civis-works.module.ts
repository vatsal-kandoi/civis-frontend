import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HowCivisWorksComponent } from './how-civis-works.component';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';

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
    SharedComponentsModule,
    PipesModule
  ],
  exports: [RouterModule],
})
export class HowCivisWorksModule { }
