import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { Auth0Service } from './auth0.service';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private auth: AuthService, private auth0: Auth0Service, public router: Router) {}
  canActivate(): boolean {
    if (
      // !this.auth.isAuthenticated() &&
      !this.auth0.isAuthenticated$) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ): Observable<boolean> | Promise<boolean|UrlTree> | boolean {
  //   return this.auth0.isAuthenticated$.pipe(
  //     tap(loggedIn => {
  //       if (!loggedIn) {
  //         this.auth0.login(state.url);
  //       }
  //     })
  //   );
  // }
}
