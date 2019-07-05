import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {ActionButtonComponent} from './action-button/action-button.component';
import {ActionModalComponent} from './action-modal/action-modal.component';
import {ConfirmationModalComponent} from './confirmation-modal/confirmation-modal.component';
import {ErrorComponent} from './error-modal/error.component';
import {ConsultationCardComponent} from './consultation-card/consultation-card.component';


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
    CommonModule
  ],
  exports: [
    ActionButtonComponent,
    ActionModalComponent,
    ConfirmationModalComponent,
    ErrorComponent,
    ConsultationCardComponent
  ]
})
export class SharedComponentsModule {
}
