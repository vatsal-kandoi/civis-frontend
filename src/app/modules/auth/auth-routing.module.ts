import {NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
    { path: '', redirectTo: 'sign-up', pathMatch: 'full', component: SignUpComponent },
    { path: 'sign-up', component: SignUpComponent },
    { path: 'login', component: LoginComponent}
];




@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule
    ]
})

export class AuthRoutingModule {}
