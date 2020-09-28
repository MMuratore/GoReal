import { Component, OnInit, ViewChild} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {MatSidenav} from '@angular/material/sidenav';
import { AuthService } from '../../services/auth.service';
import { Role } from '../../models/role.enum';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'GoReal';
  Role = Role;
  user: User = null;
  multiLink = [
    {icon: 'hdr_strong', title: 'Play', link: 'play', click: this.close},
    {icon: 'emoji_events', title: 'Tournament', link: 'tournament', click: this.close},
    {icon: 'format_list_numbered', title: 'Leaderboards', link: 'leaderboards', click: this.close}
  ];
  soloLink = [
    {icon: 'school', title: 'Learn', link: 'learn', click: this.close},
    {icon: 'account_tree', title: 'Joseki', link: 'joseki', click: this.close},
    {icon: 'widgets', title: 'Demo', link: 'demo', click: this.close},
  ];
  userLink = [
    {icon: 'person', title: 'Profile', link: 'profile', click: this.close},
    {icon: 'settings', title: 'Settings', link: 'settings', click: this.close},
    {icon: 'info', title: 'About', link: 'about', click: this.close}
  ];
  connectedToolbarLink = [
    {icon: 'admin_panel_settings', link: 'administrator', roles: Role.SuperAdministrator},
    {icon: 'person_pin', link: 'profile', roles: Role.None},
    {icon: 'logout', click: this.logout, roles: Role.None}
  ];
  disconnectedToolbarLink = [
    {icon: 'login', link: 'login'}
  ];

  @ViewChild('drawer') sidenav: MatSidenav;

  private isHandset: boolean;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => this.isHandset = result.matches),
    shareReplay()
  );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService
  ) {}

  
  ngOnInit() {
    this.authService.user.subscribe(x => this.user = x);  
  }

  logout() {
    this.authService.logout();
  }

  close() {
    if(this.isHandset)
      this.sidenav.close()
  }

}
