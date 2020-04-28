import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Auth0Service } from './auth0.service';
import { Observable, throwError } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private auth: Auth0Service) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.auth.getTokenSilently$().pipe(
      mergeMap(token => {
        const tokenReq = req.clone({
          setHeaders: { Authorization: `Bearer ${token}` }
        });
        return next.handle(tokenReq);
      }),
      catchError(err => throwError(err))
    );
  }
}

// import { Injectable } from '@angular/core';
// import {
//   HttpRequest,
//   HttpResponse,
//   HttpErrorResponse,
//   HttpHandler,
//   HttpEvent,
//   HttpInterceptor
// } from '@angular/common/http';
// import { AuthService } from './auth.service';
// import { Observable } from 'rxjs';
// import { map, catchError } from 'rxjs/operators';

// @Injectable()
// export class RequestInterceptor implements HttpInterceptor {
//   constructor(public auth: AuthService) { }
//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     request = request.clone({
//       setHeaders: {
//         'Authorization': `Bearer ${this.auth.getToken()}`,
//         'Content-Type': 'application/json',
//       }
//     });
//     return next.handle(request).pipe(
//       map((event: HttpEvent<any>) => {
//         if (event instanceof HttpResponse) {
//           // successful response
//         }
//         return event;
//       }),
//       catchError((error: HttpErrorResponse) => {
//         console.log(error)
//         this.auth.invalidate();
//         throw 'error:' + error;
//     }));
//   }
// }
