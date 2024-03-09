import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, catchError, filter, switchMap, take, throwError } from "rxjs";
import { AuthenticationService } from "../_services/authentication/authentication.service";
import { User } from "../models/user.mode";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    private isRefreshing = false;
private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    constructor(private _auth:AuthenticationService){}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return this.handle401Error(req, next);
        }
        if (error.status === 500) {
         
        }
        if (error.status === 400) {
         
        }
        if (error.status === 0) {
         
        } else {
          // domaini atıyoruz
          const url = req.url;
          const regexPattern = /^https:\/\/([^/]+)\//;
          const endPointUrl = url.replace(regexPattern, '');

          console.log(`Hatalı Endpoint URL: ${endPointUrl}`);
          // Diğer hata kodu log
          console.log('Hata Kodu: ' + error.status);
        }
        return throwError(error);
      })
      
    );
  }

  
  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  if (!this.isRefreshing) {
    this.isRefreshing = true;
    this.refreshTokenSubject.next(null);
    return this._auth.refreshToken().pipe(
      switchMap((user: User) => {
      this.isRefreshing = false;
      this.refreshTokenSubject.next(user.token);
      return next.handle(
        request = request.clone({
          setHeaders: {
            'Authorization': `Bearer ${user.token}`
          }
        })
      );
    }));
  } else {
    return this.refreshTokenSubject.pipe(
      filter(token => token != null),
      take(1),
      switchMap(jwt => {
        return next.handle(
          request = request.clone({
            setHeaders: {
              'Authorization': `Bearer ${jwt}`
            }
          })
        );
      })
    );
  }
}

}