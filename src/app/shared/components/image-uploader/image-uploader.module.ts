import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {ModalModule} from 'ngx-bootstrap/modal';
import {NgxImgModule} from 'ngx-img';
import {ImageUploaderComponent} from './image-uploader.component';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [ImageUploaderComponent],
  imports: [
    CommonModule,
    ModalModule,
    NgxImgModule,
    PipesModule
  ],
  exports: [ImageUploaderComponent]
})
export class ImageUploaderModule {
}
