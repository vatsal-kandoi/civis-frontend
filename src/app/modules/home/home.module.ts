import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home.component';
import { ConsultationCardModule } from 'src/app/shared/components/consultation-card/consultation-card.module';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    ConsultationCardModule,
  ],
  declarations: [
    HomeComponent
  ]
})
export class HomeModule {
}
