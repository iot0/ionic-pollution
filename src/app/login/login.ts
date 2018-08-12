import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: 'login.html',
  styleUrls: ['login.css']
})
export class LoginPage {
  userName:string;
  constructor(private router:Router){}
  onLogin(){
    if(this.userName==='admin'){
      this.router.navigate(["/admin"]);
    }else{
      this.router.navigate(["/device-data"]);
    }
  }
}
