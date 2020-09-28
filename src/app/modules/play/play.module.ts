import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayRoutingModule } from './play-routing.module';
import { SharedModule } from '../shared/shared.module';

import { CardComponent } from './card/card.component';
import { LayoutComponent } from './layout/layout.component';
import { TableComponent } from './table/table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MiniCardComponent } from './mini-card/mini-card.component';


@NgModule({
  declarations: [LayoutComponent, CardComponent, TableComponent, MiniCardComponent],
  imports: [
    CommonModule,
    PlayRoutingModule,
    SharedModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ]
})
export class PlayModule { }

