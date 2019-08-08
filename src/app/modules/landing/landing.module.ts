import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing.component';
import { LandingRoutingModule } from './landing-routing.module';
import { SharedComponentsModule } from '../../shared/components/shared-components.module';
import { HowCivisWorksCarouselComponent } from './how-civis-works-carousel/how-civis-works-carousel.component';

@NgModule({
  declarations: [LandingComponent, HowCivisWorksCarouselComponent],
  imports: [
    CommonModule,
    LandingRoutingModule,
    SharedComponentsModule
  ]
})
export class LandingModule { }
