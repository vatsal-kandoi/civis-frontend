import {CommonModule} from '@angular/common';
import { NgModule } from '@angular/core';
import {NgSelectModule} from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';


@NgModule({
    declarations: [
        SignUpComponent,
        LoginComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        AuthRoutingModule,
        NgSelectModule,
        FormsModule
    ],
    exports: []
})

export class AuthModule {}
