import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './modules/account/components/login/login.component';
import { RegisterComponent } from './modules/account/components/register/register.component';
import { Role } from './modules/account/models/role.enum';
import { AuthGuardService } from './modules/account/services/auth-guard.service';
import { NotFoundComponent } from './components/notFound/notFound.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'play', canActivate : [AuthGuardService], loadChildren: () => import('./modules/play/play.module').then(m => m.PlayModule) },
  { path: 'tournament', canActivate : [AuthGuardService], loadChildren: () => import('./modules/tournament/tournament.module').then(m => m.TournamentModule) },
  { path: 'leaderboards', canActivate : [AuthGuardService], loadChildren: () => import('./modules/leaderboards/leaderboards.module').then(m => m.LeaderboardsModule) },
  { path: 'learn', canActivate : [AuthGuardService], loadChildren: () => import('./modules/learn/learn.module').then(m => m.LearnModule) },
  { path: 'joseki', canActivate : [AuthGuardService], loadChildren: () => import('./modules/joseki/joseki.module').then(m => m.JosekiModule) },
  { path: 'demo', canActivate : [AuthGuardService], loadChildren: () => import('./modules/demo/demo.module').then(m => m.DemoModule) },
  { path: 'profile', canActivate : [AuthGuardService], loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule) },
  { path: 'administrator', canActivate : [AuthGuardService], data: {roles: Role.SuperAdministrator}, loadChildren: () => import('./modules/administrator/administrator.module').then(m => m.AdministratorModule) },
  { path: 'settings', canActivate : [AuthGuardService], loadChildren: () => import('./modules/settings/settings.module').then(m => m.SettingsModule) },
  { path: 'about', component: AboutComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  {path: 'notFound', component : NotFoundComponent},
  { path: '', component: HomeComponent},
  { path: '**', redirectTo: 'notFound' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
