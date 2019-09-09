import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { LandingGuard } from './shared/guards/landing.guard';
import { AuthGuard } from './shared/guards/auth.guard';
import { TermsOfServiceComponent } from './modules/policy/terms-of-service/terms-of-service.component';
import { ContentPolicyComponent } from './modules/policy/content-policy/content-policy.component';
import { PrivacyPolicyComponent } from './modules/policy/privacy-policy/privacy-policy.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: './modules/landing/landing.module#LandingModule',
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
    path: 'leader-board',
    loadChildren: './modules/leader-board/leader-board.module#LeaderBoardModule'
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
    path: 'terms',
    component: TermsOfServiceComponent
  },
  {
    path: 'content-policy',
    component: ContentPolicyComponent
  },
  {
    path: 'privacy',
    component: PrivacyPolicyComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
