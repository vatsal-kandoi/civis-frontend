import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap';
import { UserProfileModalComponent } from './user-profile-modal.component';
import { SharedDirectivesModule } from '../directives/shared-directives.module';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        ModalModule,
        SharedDirectivesModule,
        RouterModule
    ],
    exports: [
        UserProfileModalComponent
    ],
    declarations: [
        UserProfileModalComponent
    ],
    providers: []
})
export class UserProfileModalModule { }