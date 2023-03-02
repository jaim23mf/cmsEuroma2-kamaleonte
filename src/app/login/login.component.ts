import { Component , OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../usersService/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public email: string="";
  public password: string="";
  error:string="";
  constructor(public router: Router , public userService: UsersService) { }
  ngOnInit(): void {
  }

  login() {
    ////console.log(this.email);
    ////console.log(this.password);

    const user = { username: this.email, password: this.password };

    /*this.userService.logintest(user).subscribe(data => {
      this.userService.setToken(data.token);
      this.router.navigateByUrl("/Home");
    });*/
    this.userService.login(user).subscribe((data: any) => {
      //console.log(data);
      if(data.logged == true){
        this.error="";
        this.userService.setToken(data.token);
        this.userService.setProfile(data.profile);
        this.router.navigateByUrl("/General");
        let n = {userName: this.email, password: this.password ,refreshToken:data.refreshToken.token,refreshTokenExpires:data.refreshToken.expires};
        //console.log(n);
        console.log(data.profile);
        this.userService.setTokenR(n);

      }
      else{
        this.error = "Incorrect user or password";
      }
    
    });    
  

  }


}
