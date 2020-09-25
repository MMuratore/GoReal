import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaderboardsRoutingModule } from './leaderboards-routing.module';
import { SharedModule } from '../shared/shared.module';

import { LayoutComponent } from './layout/layout.component';


@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    LeaderboardsRoutingModule,
    SharedModule
  ]
})
export class LeaderboardsModule { }

