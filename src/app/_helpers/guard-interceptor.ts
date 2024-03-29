import { Injectable } from '@angular/core';
import {
 HttpRequest,
 HttpHandler,
 HttpEvent,
 HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { AuthenticationService } from '../_services/authentication/authentication.service';
@Injectable()
export class GuardInterCeptor implements HttpInterceptor {
    constructor(private _auth:AuthenticationService){

    }
  intercept(
  request: HttpRequest<any>,
  next: HttpHandler): Observable<HttpEvent<any>> {
  
  const user = this._auth.userValue;
  const isLoggedIn = user && user.token;
  const isApiUrl = request.url.startsWith(environment.apiUrl);
  if (isLoggedIn && isApiUrl) {
    request = request.clone({
      setHeaders: {
        'Authorization': `Bearer ${user.token}`
      }
    })
  }
  return next.handle(request);
}
}