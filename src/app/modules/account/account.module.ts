import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthService } from './services/auth.service';
import { MatCardModule } from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { AuthGuardService } from './services/auth-guard.service';
import { AddressComponent } from './components/address/address.component';



@NgModule({
  declarations: [LoginComponent, RegisterComponent, AddressComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    HttpClientModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule
  ],
  exports: [
    LoginComponent,
    RegisterComponent
  ],
  providers: [
    AuthService,
    AuthGuardService
  ],
})
export class AccountModule { }
