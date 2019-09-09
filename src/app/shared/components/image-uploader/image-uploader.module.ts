import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {ModalModule} from 'ngx-bootstrap/modal';
import {NgxImgModule} from 'ngx-img';
import {ImageUploaderComponent} from './image-uploader.component';

@NgModule({
  declarations: [ImageUploaderComponent],
  imports: [
    CommonModule,
    ModalModule,
    NgxImgModule
  ],
  exports: [ImageUploaderComponent]
})
export class ImageUploaderModule {
}
