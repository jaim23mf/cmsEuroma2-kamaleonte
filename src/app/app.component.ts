import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UsersService } from './usersService/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'euroma2';
userToken ='';
profile = 0;
visible = false;
admin = false;
  constructor(private userService : UsersService, private router:Router) {
    this.userToken = this.userService.getToken();
    this.profile = +this.userService.getProfile();
    this.visible=false;
    //console.log(this.userToken);
    if(this.userToken != ''){
      this.visible=true;
    }
  
    if(this.profile == 1){this.admin=true;}
    else{this.admin = false;}

    router.events.subscribe((data:any)=>{
      if(data instanceof NavigationEnd){

        this.userToken = this.userService.getToken();
        this.profile = +this.userService.getProfile();
        console.log("Perfil..." , this.profile);
        this.visible = false;
        if(this.userToken != ''){
          this.visible=true;
        }
        else{
          //this.userService.logout
        }

        if(this.profile == 1){this.admin=true;}
        else{this.admin = false;}


      }
     });
  }

  logOut(){
    this.userService.logout();
  }


}
