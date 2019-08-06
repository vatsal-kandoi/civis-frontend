import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { LandingGuard } from './shared/guards/landing.guard';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: './modules/landing/landing.module#LandingModule',
    canActivate: [LandingGuard]
  },

  {
    path: 'home',
    loadChildren: './modules/home/home.module#HomeModule'
  },
  {
    path: 'auth',
    loadChildren: './modules/auth/auth.module#AuthModule'
  },
  {
    path: 'consultations',
    loadChildren: './modules/consultations/consultations.module#ConsultationsModule'
  },
  {
    path: 'profile',
    loadChildren: './modules/profile/profile.module#ProfileModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'how-civis-works',
    loadChildren: './modules/how-civis-works/how-civis-works.module#HowCivisWorksModule'
  },
  {
    path: 'about-us',
    loadChildren: './modules/about-us/about-us.module#AboutUsModule'
  },
  {
    path: 'policy',
    loadChildren: './modules/policy/policy.module#PolicyModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
