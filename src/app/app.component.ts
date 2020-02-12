import { Component, OnInit } from '@angular/core';
import { LoginService} from './users/login/login.service';

import { IUser } from './users/user';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  pageTitle: string = 'Acme Product Management';
  isLoggedin:boolean;
  isAdmin:boolean;

  constructor(private loginService: LoginService) {}
  ngOnInit(): void {}
}
