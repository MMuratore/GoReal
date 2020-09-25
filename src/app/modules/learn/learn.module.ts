import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LearnRoutingModule } from './learn-routing.module';
import { SharedModule } from '../shared/shared.module';

import { LayoutComponent } from './layout/layout.component';


@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    LearnRoutingModule,
    SharedModule
  ]
})
export class LearnModule { }

