import { NgModule } from '@angular/core';
import { ConfirmEmailModalComponent } from './confirm-email-modal.component';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        ModalModule
    ],
    exports: [
        ConfirmEmailModalComponent
    ],
    declarations: [
        ConfirmEmailModalComponent
    ],
    providers: []
})
export class ConfirmEmailModule { }
