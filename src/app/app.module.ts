import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './modules/shared/shared.module';

import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { AccountModule } from './modules/account/account.module';
import { NotFoundComponent } from './components/notFound/notFound.component';
import { NotAllowedComponent } from './components/notAllowed/notAllowed.component';
import { ConfirmBoxComponent } from './components/confirm-box/confirm-box.component';
import { SidenavItemComponent } from './components/sidenav-item/sidenav-item.component';
import { ToolbarItemComponent } from './components/toolbar-item/toolbar-item.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './helpers/jwt.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent,
    NotFoundComponent,
    NotAllowedComponent,
    ConfirmBoxComponent,
    SidenavItemComponent,
    ToolbarItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AccountModule,
    SharedModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
