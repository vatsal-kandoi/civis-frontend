import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {ActionButtonComponent} from './action-button/action-button.component';
import {ActionModalComponent} from './action-modal/action-modal.component';
import {ConfirmationModalComponent} from './confirmation-modal/confirmation-modal.component';
import {ErrorModalComponent} from './error-modal/error-modal.component';


@NgModule({
  declarations: [
    ActionButtonComponent,
    ActionModalComponent,
    ConfirmationModalComponent,
    ErrorModalComponent
  ],
  // imports: [BrowserModule],
  imports: [
    CommonModule
  ],
  exports: [
    ActionButtonComponent,
    ActionModalComponent,
    ConfirmationModalComponent,
    ErrorModalComponent
  ]
})
export class SharedComponentsModule {
}
