import { Component, HostBinding, OnInit, ViewChild} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {MatSidenav} from '@angular/material/sidenav';
import { AuthService } from '../../../services/auth.service';
import { Role } from '../../../models/role.enum';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'GoReal';
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

  close() {
    if(this.isHandset)
      this.sidenav.close()
  }

}
