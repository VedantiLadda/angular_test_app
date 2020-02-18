import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';


@NgModule({
    declarations: [LoginComponent],
    imports: [
      RouterModule.forChild([
        { path: 'login', component: LoginComponent }, 
      ]),
      SharedModule
    ]
  })

export class UserModule { }