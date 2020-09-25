import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { SharedModule } from '../shared/shared.module';

import { LayoutComponent } from './layout/layout.component';
import { UserInfosComponent } from './components/user-infos/user-infos.component';
import { UserUpdateComponent } from './components/user-update/user-update.component';
import { GameInfosComponent } from './components/game-infos/game-infos.component';
import { GameHistoryComponent } from './components/game-history/game-history.component';


@NgModule({
  declarations: [
    LayoutComponent, 
    UserInfosComponent, 
    UserUpdateComponent, 
    GameInfosComponent,
    GameHistoryComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule
  ]
})
export class ProfileModule { }

