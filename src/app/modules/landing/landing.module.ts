import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing.component';
import { LandingRoutingModule } from './landing-routing.module';
import { SharedComponentsModule } from '../../shared/components/shared-components.module';

@NgModule({
  declarations: [LandingComponent],
  imports: [
    CommonModule,
    LandingRoutingModule,
    SharedComponentsModule
  ]
})
export class LandingModule { }
