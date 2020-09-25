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


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent,
    NotFoundComponent,
    NotAllowedComponent,
    ConfirmBoxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AccountModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
