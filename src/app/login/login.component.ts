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
    //console.log(this.email);
    //console.log(this.password);

    const user = { username: this.email, password: this.password };

    /*this.userService.logintest(user).subscribe(data => {
      this.userService.setToken(data.token);
      this.router.navigateByUrl("/Home");
    });*/
    
    this.userService.login(user).subscribe((data: { logged: boolean; token: any; }) => {
      console.log(data);
      if(data.logged == true){
        this.error="";
        this.userService.setToken(data.token);
        this.router.navigateByUrl("/General");
      }
      else{
        this.error = "Usuario o contraseña incorrecta";
      }
    });    
    
    //Llamada para comprobar el login 

    //this.userService.logintest(user);

  }
}
