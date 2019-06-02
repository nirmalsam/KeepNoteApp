import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './services/authentication.service';
import { RouterService } from './services/router.service';

@Injectable()
export class CanActivateRouteGuard implements CanActivate {

  constructor(private authService: AuthenticationService,
    private routerService: RouterService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const token = localStorage.getItem('bearerToken');
    if (token) {
      return this.authService.isUserAuthenticated(token).then((isAuthenticated: boolean) => {
        console.log("Authenticated " + isAuthenticated);
        this.authService.getAuthentication().next(isAuthenticated);
        if (isAuthenticated) {
          return true;
        } else {
          return false;
        }
      }).catch(err => {
        console.log(err);
        this.authService.getAuthentication().next(false);
        this.routerService.routeToLogin();
        return false;
      });
    } else {
      console.log("No token");
      this.authService.getAuthentication().next(false);
      this.routerService.routeToLogin();
      return false;
    }
  }
}
