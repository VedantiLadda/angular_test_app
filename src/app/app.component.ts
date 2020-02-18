import { Component, DoCheck } from '@angular/core';
import { LoginService } from './users/login/login.service';

import { IUser } from './users/user';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck {
  
  pageTitle: string = 'Acme Product Management';
  isLoggedin: boolean = this.loginService.getLoginStatus();
  isAdmin: boolean = this.loginService.getAdminStatus();
  user: IUser;

  constructor(private loginService: LoginService) { }

  ngDoCheck(): void {
    this.isLoggedin = this.loginService.getLoginStatus();
    this.isAdmin = this.loginService.getAdminStatus();
  }

  logout():void{
    this.loginService.setAdminStatus(false);
    this.loginService.setLoginStatus(false);
  }
  

}
