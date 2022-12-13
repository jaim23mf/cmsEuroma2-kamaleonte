import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { GlobalConstants } from '../common/global-constants';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  api:string = GlobalConstants.api;
  //api:string = "http://api.softsignage.cc";

  constructor(private http: HttpClient,private cookies: CookieService) {}


  login(user: any): Observable<any> {
    return this.http.post(this.api + "/identity/login", user);
  }

  logout():void{
      this.cookies.deleteAll();
  }

  

  setToken(token: string) {
    this.cookies.set("token", token);
  }
  getToken() {
    return this.cookies.get("token");
  }

  getUserLogged():Observable<any> {
    console.log(this.cookies.get("token"));
    return this.http.post(this.api + "/PostUser",{token:this.getToken()});
  }
}
