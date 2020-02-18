import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, tap , map} from 'rxjs/operators';
import { IUser } from '../user';

@Injectable({
    providedIn: 'root'
  })
  export class LoginService {
      
    private loginURL = 'http://localhost:4000/users';

    constructor(private http: HttpClient) { }

    public setLoginStatus(data: boolean){
      sessionStorage.setItem('isLoggedIn', JSON.stringify(data));
    }
  
    public getLoginStatus():boolean{
     return JSON.parse(sessionStorage.getItem('isLoggedIn'));
    }

    public setAdminStatus(data: boolean){
      sessionStorage.setItem('isAdmin', JSON.stringify(data));
    }
  
    public getAdminStatus():boolean{
     return JSON.parse(sessionStorage.getItem('isAdmin'));
    }

    authenticateUser(user:IUser):Observable<any>{
      //onst headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      const url = `${this.loginURL}?username=${user.username}&password=${user.password}`;
      return this.http.get<IUser>(url).pipe(
        tap(data => console.log('authenticate: ' + JSON.stringify(data))),
        map((response) =>{ return response;}),
        catchError(this.handleError)
      );
     
    }

    private handleError(err: HttpErrorResponse) {

      // in a real world app, we may send the server to some remote logging infrastructure
      // instead of just logging it to the console
  
      let errorMessage = '';
      if (err.error instanceof ErrorEvent) {
  
        // A client-side or network error occurred. Handle it accordingly.
  
        errorMessage = `An error occurred: ${err.error.message}`;
      } else {
        
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
  
        errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
      }
      console.error(errorMessage);
      return throwError(errorMessage);
    }
  }