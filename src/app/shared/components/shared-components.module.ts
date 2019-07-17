import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {ActionButtonComponent} from './action-button/action-button.component';
import {ActionModalComponent} from './action-modal/action-modal.component';
import {ConfirmationModalComponent} from './confirmation-modal/confirmation-modal.component';
import {ErrorComponent} from './error-modal/error.component';
import {ConsultationCardComponent} from './consultation-card/consultation-card.component';
import { LinearLoaderModule } from './linear-loader/linear-loader.module';
import { LinearLoaderComponent } from './linear-loader/linear-loader.component';
import { LinearLoaderService } from './linear-loader/linear-loader.service';


@NgModule({
  declarations: [
    ActionButtonComponent,
    ActionModalComponent,
    ConfirmationModalComponent,
    ErrorComponent,
    ConsultationCardComponent
  ],
  // imports: [BrowserModule],
  imports: [
    CommonModule,
    LinearLoaderModule
  ],
  exports: [
    ActionButtonComponent,
    ActionModalComponent,
    ConfirmationModalComponent,
    ErrorComponent,
    ConsultationCardComponent,
    LinearLoaderComponent
  ],
  providers: [
    LinearLoaderService
  ]
})
export class SharedComponentsModule {
}
