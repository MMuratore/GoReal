import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { NotAllowedComponent } from './components/notAllowed/notAllowed.component';
import { NotFoundComponent } from './components/notFound/notFound.component';

import { LayoutComponent } from './layout/layout.component';


const routes: Routes = [
  { path: 'home', component: LayoutComponent },
  { path: 'notAllowed', component: NotAllowedComponent },
  { path: 'notFound', component: NotFoundComponent },
  { path: 'about', component: AboutComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
