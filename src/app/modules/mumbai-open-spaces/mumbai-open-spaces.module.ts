import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { MumbaiOpenSpacesComponent } from './mumbai-open-spaces.component';

const routes: Routes = [
    {
      path: '',
      component: MumbaiOpenSpacesComponent
    }
  ];


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        PipesModule
    ],
    exports: [
        MumbaiOpenSpacesComponent
    ],
    declarations: [
        MumbaiOpenSpacesComponent
    ],
    providers: []
})
export class MumbaiOpenSpacesModule { }
