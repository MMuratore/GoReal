import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';

import { LayoutComponent } from './layout/layout.component';
import { MiniCardComponent } from './components/mini-card/mini-card.component';
import { TableComponent } from './components/table/table.component';

import { TotimePipe } from './pipes/totime.pipe';
import { NotAllowedComponent } from './components/notAllowed/notAllowed.component';
import { NotFoundComponent } from './components/notFound/notFound.component';
import { AboutComponent } from './components/about/about.component';


@NgModule({
  declarations: [
    LayoutComponent, 
    TableComponent,
    MiniCardComponent,
    NotAllowedComponent,
    NotFoundComponent,
    AboutComponent,
    TotimePipe
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }

