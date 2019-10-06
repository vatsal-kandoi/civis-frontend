import {NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { SuccessComponent } from './success/success.component';
import { FailureComponent } from './failure/failure.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [
    { path: '', redirectTo: 'sign-up', pathMatch: 'full', component: SignUpComponent },
    { path: 'sign-up', component: SignUpComponent },
    { path: 'login', component: LoginComponent},
    { path: 'success', component: SuccessComponent},
    { path: 'failure', component: FailureComponent},
    { path: 'forgot_password', component: ForgotPasswordComponent}
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
