import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GobanActionComponent } from './components/goban-action/goban-action.component';
import { SelectorComponent } from './components/selector/selector.component';

import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  { path: '', component: SelectorComponent },
  { path: 'goban', component: LayoutComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemoRoutingModule { }
