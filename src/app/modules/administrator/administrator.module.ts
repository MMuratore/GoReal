import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayRoutingModule } from './administrator-routing.module';
import { SharedModule } from '../shared/shared.module';

import { UserListComponent } from './user-list/user-list.component';


@NgModule({
  declarations: [UserListComponent],
  imports: [
    CommonModule,
    PlayRoutingModule,
    SharedModule
  ]
})
export class AdministratorModule { }

