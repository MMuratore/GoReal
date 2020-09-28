import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Role } from '../models/role.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
      private router: Router,
      private authService: AuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const roles = route.data["roles"] as Role;
      const user = this.authService.userValue;
      if (user) {
        if(typeof roles !== "undefined") {
          if(roles === (user.roles & roles))
            return true;
          else
          {
            this.router.navigate(['/notAllowed'], { queryParams: { returnUrl: state.url }});
            return false;
          }
          
        }
        else
          return true;
      }

      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
      return false;
  }
}
