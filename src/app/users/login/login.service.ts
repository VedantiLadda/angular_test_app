import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, tap , map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })
  export class LoginService {
      
    private loginURL = 'http://localhost:4000/users';

    constructor(private http: HttpClient) { }
  }