import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ActionButtonComponent} from './action-button/action-button.component';
import {ActionModalComponent} from './action-modal/action-modal.component';
import {ConfirmationModalComponent} from './confirmation-modal/confirmation-modal.component';
import {ConsultationCardComponent} from './consultation-card/consultation-card.component';
import { LinearLoaderModule } from './linear-loader/linear-loader.module';
import { LinearLoaderComponent } from './linear-loader/linear-loader.component';
import { LinearLoaderService } from './linear-loader/linear-loader.service';
import { RouterModule } from '@angular/router';
import { ErrorComponent } from './error-modal/error.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    ActionButtonComponent,
    ActionModalComponent,
    ConfirmationModalComponent,
    ConsultationCardComponent,
    ErrorComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    LinearLoaderModule,
    RouterModule
  ],
  exports: [
    ActionButtonComponent,
    ActionModalComponent,
    ConfirmationModalComponent,
    ConsultationCardComponent,
    ErrorComponent,
    ConsultationCardComponent,
    LinearLoaderComponent,
    FooterComponent
  ],
  providers: [
    LinearLoaderService
  ]
})
export class SharedComponentsModule {
}
