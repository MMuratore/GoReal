import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelectorComponent } from './components/selector/selector.component';

import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  { path: '', component: SelectorComponent },
  { path: 'goban/:id', component: LayoutComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemoRoutingModule { }
