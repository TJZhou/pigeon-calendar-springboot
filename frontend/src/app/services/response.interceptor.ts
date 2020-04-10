// import {
//     HttpRequest,
//     HttpHandler,
//     HttpEvent,
//     HttpInterceptor,
//     HttpResponse,
//     HttpErrorResponse
// } from '@angular/common/http';
// import { AuthService } from './auth.service';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators'
// import { Injectable } from '@angular/core';

// @Injectable()
// export class ResponseInterceptor implements HttpInterceptor {
//     constructor(private auth: AuthService) { }
//     intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//         return next.handle(req).pipe(tap(response => {
//                 console.log(response)
//                 // if(response.status === 401 || response.status === 403)
//                 //     this.auth.invalidate();
//                 return response;
//             }
//         ));
//     }
// }