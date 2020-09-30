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
    {icon: 'hdr_strong', title: 'Play', link: 'play'},
    {icon: 'emoji_events', title: 'Tournament', link: 'tournament'},
    {icon: 'format_list_numbered', title: 'Leaderboards', link: 'leaderboards'}
  ];
  soloLink = [
    {icon: 'school', title: 'Learn', link: 'learn'},
    {icon: 'account_tree', title: 'Joseki', link: 'joseki'},
    {icon: 'widgets', title: 'Demo', link: 'demo'},
  ];
  userLink = [
    {icon: 'person', title: 'Profile', link: 'profile'},
    {icon: 'settings', title: 'Settings', link: 'settings'},
    {icon: 'info', title: 'About', link: 'about'}
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
