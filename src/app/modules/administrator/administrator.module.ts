import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayRoutingModule } from './administrator-routing.module';
import { SharedModule } from '../shared/shared.module';

import { TableComponent } from './table/table.component';


@NgModule({
  declarations: [TableComponent],
  imports: [
    CommonModule,
    PlayRoutingModule,
    SharedModule
  ]
})
export class AdministratorModule { }

