import { Injectable } from '@angular/core';
import { UsersService } from '../usersService/users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  state:boolean = false;
  constructor(private userService:UsersService) { }  

  isAuthenticated(){

      if(this.userService.getToken().trim().length > 0  )this.state = true;
      else this.state = false;
      return this.state;
  }
}
