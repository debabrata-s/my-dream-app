import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { NewUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  addUserUrl = "http://localhost:3000/signup";
  getUsersUrl = "http://localhost:3000/users";
  deleteUserUrl = "http://localhost:3000/user/";

  addUser(user: NewUser): Observable<NewUser> {
    return this.http.post<NewUser>(this.addUserUrl, user)
      .pipe(
        catchError(this.handleError)
      );
  }
  getUsers(): Observable<NewUser[]> {
    return this.http.get<NewUser[]>(this.getUsersUrl)
      .pipe(
        catchError(this.handleError)
      );
  }
  deleteUser(id:string):Observable<any>{
    return this.http.delete(this.deleteUserUrl+id)
    .pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
