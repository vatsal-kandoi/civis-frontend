import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile.component';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile.routing.module';
import { ModalModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        ProfileRoutingModule,
        ModalModule,
        FormsModule
    ],
    exports: [],
    declarations: [ProfileComponent],
    providers: []
})
export class ProfileModule { }
