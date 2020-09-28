import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { SharedModule } from '../shared/shared.module';

import { LayoutComponent } from './layout/layout.component';
import { UserInfosComponent } from './components/user-infos/user-infos.component';
import { UserUpdateComponent } from './components/user-update/user-update.component';
import { GameInfosComponent } from './components/game-infos/game-infos.component';
import { MiniCardComponent } from './components/mini-card/mini-card.component';
import { TableComponent } from './components/table/table.component';
import { CardComponent } from './components/card/card.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LayoutComponent, 
    UserInfosComponent, 
    UserUpdateComponent, 
    GameInfosComponent,
    CardComponent,
    TableComponent,
    MiniCardComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule
  ]
})
export class ProfileModule { }

