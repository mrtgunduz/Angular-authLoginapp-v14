import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/_services/authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authenticationService:AuthenticationService,
    private router:Router){}
  canActivate(
         route: ActivatedRouteSnapshot,
         state: RouterStateSnapshot) {
  const user = this.authenticationService.userValue;
  if (user) {
    return true;
  } else {
    this.router.navigate(['/login'],
      {
        queryParams: { returnUrl: state.url }
      });
    return false;
  }
}
  
}
