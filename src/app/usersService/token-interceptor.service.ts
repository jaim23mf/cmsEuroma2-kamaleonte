
import { Injectable, Type } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { UsersService } from './users.service';
import { CookieOptions, CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor( private userService:UsersService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<any> {
    const  token  = this.userService.getToken();


    if (token) {
      request = request.clone({
        setHeaders: {
          'Authorization': `Bearer ${token}`,
        },
        withCredentials: true,
      });
    }
    return next.handle(request).pipe(
      catchError((err) => {
        //if (err.status === 401) {
        console.log("Error");
        if (err.status === 0 ||err.status === 401) {
            return this.handleResponseError(err, request, next);
        }
        else{

          this.userService.logout();
        //}
        const error = err.message || err.statusText;
        return throwError(error);
        }
      })
    );
  }

  refreshToken(){


      return this.userService.refreshToken().subscribe((data:any)=>{
        console.log(data);
        if(data.token || data.logged == true){
        this.userService.setToken(data.token);
        return true;
        }
        else{
          this.userService.logout();
          return false;
        }
      });

}

  handleResponseError(error:any, request?:any, next?:any):any {
    console.log(error);
    // Business error
    if (error.status === 400) {
        // Show message
    }

    // Invalid token error
    else if (error.status === 0 || error.status === 401) {
      let i = this.refreshToken();
      if (i){
        return next.handle(request);
      }
      else{
        this.userService.logout();
      }
       /* return this.refreshToken().pipe(
            switchMap(() => {
                request = this.addAuthHeader(request);
                return next.handle(request);
            }),
            catchError(e => {
                if (e.status !== 401) {
                    return this.handleResponseError(e);
                } else {
                    this.userService.logout();
                }
            }));*/
    }

    // Access denied error
    else if (error.status === 403) {
        // Show message
        // Logout
        this.userService.logout();
    }

    // Server error
    else if (error.status === 500) {
        // Show message
    }

    // Maintenance error
    else if (error.status === 503) {
        // Show message
        // Redirect to the maintenance page
    }

    return throwError(error);
}

}