import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';
import { GameInfosComponent } from './components/game-infos/game-infos.component';
import { UserUpdateComponent } from './components/user-update/user-update.component';


const routes: Routes = [{ path: '', component: LayoutComponent, children: [
  { path: '', component: UserUpdateComponent },
  { path: 'gameInfos/:id', component: GameInfosComponent },
] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
