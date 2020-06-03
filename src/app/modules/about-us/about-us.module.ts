import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutUsComponent } from './about-us.component';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { Routes, RouterModule } from '@angular/router';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';

const routes: Routes = [
  {
    path: '',
    component: AboutUsComponent
  }
];

@NgModule({
  declarations: [AboutUsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedComponentsModule,
    PipesModule
  ]
})
export class AboutUsModule { }
