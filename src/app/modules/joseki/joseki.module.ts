import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JosekiRoutingModule } from './joseki-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';


@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    JosekiRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
  ]
})
export class JosekiModule { }

