import { Component, HostBinding, OnInit, ViewChild} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {MatSidenav} from '@angular/material/sidenav';
import { AuthService } from 'src/app/modules/account/services/auth.service';
import { Role } from 'src/app/modules/account/models/role.enum';
import { User } from 'src/app/modules/account/models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'GoReal';
  isDark:boolean = true;
  public Role = Role;
  public user : User;
  
  themingSubscription: Subscription;

  @ViewChild('drawer') sidenav: MatSidenav;
  @HostBinding('class') public cssClass: string;

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

  isAuth(roles : Role = Role.None) : boolean {
    if(this.user)
      return roles === (this.user.roles & roles);
    return false;
  }

  close() {
    if(this.isHandset)
      this.sidenav.close()
  }

}
