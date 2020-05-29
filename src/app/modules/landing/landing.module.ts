import { NgModule, Pipe } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing.component';
import { LandingRoutingModule } from './landing-routing.module';
import { SharedComponentsModule } from '../../shared/components/shared-components.module';
import { HowCivisWorksCarouselComponent } from './how-civis-works-carousel/how-civis-works-carousel.component';
import { SharedDirectivesModule } from 'src/app/shared/directives/shared-directives.module';
import { UserProfileModalModule } from 'src/app/shared/user-profile-modal/user-profile-modal.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';

@NgModule({
  declarations: [LandingComponent, HowCivisWorksCarouselComponent],
  imports: [
    CommonModule,
    LandingRoutingModule,
    SharedComponentsModule,
    SharedDirectivesModule,
    UserProfileModalModule,
    PipesModule
  ]
})
export class LandingModule { }
