import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoRoutingModule } from './demo-routing.module';
import { SharedModule } from '../shared/shared.module';

import { LayoutComponent } from './layout/layout.component';
import { GobanActionComponent } from './components/goban-action/goban-action.component';
import { GobanComponent } from './components/goban/goban.component';
import { SelectorComponent } from './components/selector/selector.component';


@NgModule({
  declarations: [
    LayoutComponent,
    GobanActionComponent,
    GobanComponent,
    SelectorComponent
  ],
  imports: [
    CommonModule,
    DemoRoutingModule,
    SharedModule
  ]
})
export class DemoModule { }

