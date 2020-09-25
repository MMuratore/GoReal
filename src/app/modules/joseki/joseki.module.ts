import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JosekiRoutingModule } from './joseki-routing.module';
import { SharedModule } from '../shared/shared.module';

import { LayoutComponent } from './layout/layout.component';


@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    JosekiRoutingModule,
    SharedModule
  ]
})
export class JosekiModule { }

