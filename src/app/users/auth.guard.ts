import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { LoginService } from './login/login.service';

@Injectable({
   providedIn: 'root'
})
export class AuthGuard implements CanActivate {
   constructor(private router: Router, private loginService: LoginService) { }
   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      if (this.loginService.getAdminStatus()) {
         return true;
      }
      if(this.loginService.getLoginStatus() && !this.loginService.getAdminStatus()){
         window.alert("You don't have permission to view this page");
         this.router.navigate(['/welcome']);
         return false;
      }
      // navigate to login page as user is not authenticated      
      this.router.navigate(['/login']);
      return false;
   }
}    