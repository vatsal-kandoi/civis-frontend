import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedDirectivesModule } from 'src/app/shared/directives/shared-directives.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';



@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        SharedDirectivesModule,
        ModalModule.forRoot(),
        NgSelectModule,
        FormsModule,
    ],
    exports: [
        NavbarComponent
    ],
    declarations: [
        NavbarComponent
    ],
    providers: []
})
export class NavbarModule { }
