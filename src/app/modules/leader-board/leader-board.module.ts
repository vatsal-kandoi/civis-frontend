import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponentsModule } from '../../shared/components/shared-components.module';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { LeaderBoardComponent } from './leader-board.component';
import { ModalModule } from 'ngx-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedDirectivesModule } from 'src/app/shared/directives/shared-directives.module';
import { UserProfileModalModule } from 'src/app/shared/user-profile-modal/user-profile-modal.module';

const routes: Routes = [
  {
    path: '',
    component: LeaderBoardComponent
  }
];

@NgModule({
  declarations: [LeaderBoardComponent],
  imports: [
    CommonModule,
    SharedComponentsModule,
    NgSelectModule,
    RouterModule.forChild(routes),
    ModalModule,
    FormsModule,
    SharedDirectivesModule,
    UserProfileModalModule,
  ]
})

export class LeaderBoardModule { }
