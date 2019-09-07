import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile.component';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile.routing.module';
import { ModalModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { ImageUploaderModule } from 'src/app/shared/components/image-uploader/image-uploader.module';

@NgModule({
    imports: [
        CommonModule,
        ProfileRoutingModule,
        ModalModule,
        FormsModule,
        ImageUploaderModule
    ],
    exports: [],
    declarations: [ProfileComponent],
    providers: []
})
export class ProfileModule { }
