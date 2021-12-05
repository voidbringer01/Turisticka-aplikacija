import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public authService:AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    if (!!this.authService.getAuthToken()) {
      if(this.tokenExpired(this.authService.getAuthToken())){
        this.authService.logout()
        return next.handle(request);
      }else{
        const authReq = request.clone({
          headers: request.headers.set('Authorization', `Bearer ${this.authService.getAuthToken()}`)
        });
        return next.handle(authReq);
      }
    } else {
      return next.handle(request);
    }
  }

  tokenExpired(token){
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }
}
