import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile.component';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile.routing.module';

@NgModule({
    imports: [
        CommonModule,
        ProfileRoutingModule
    ],
    exports: [],
    declarations: [ProfileComponent],
    providers: []
})
export class ProfileModule { }
