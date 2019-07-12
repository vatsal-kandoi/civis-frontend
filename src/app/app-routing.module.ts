import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: './modules/landing/landing.module#LandingModule'
  },

  {
    path: 'home',
    loadChildren: './modules/home/home.module#HomeModule'
  },
  {
    path: 'auth',
    loadChildren: './modules/auth/auth.module#AuthModule'
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
