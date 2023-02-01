import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

const BASE_URL = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  onSignIn(
    userData: Partial<{ email: string | null; password: string | null }>
  ) {
    return this.http.post(`${BASE_URL}/user/login`, userData);
  }

  onSignUp(
    userData: Partial<{
      firstName: string | null;
      lastName: string | null;
      email: string | null;
      password: string | null;
      confirmPassword: string | null;
    }>
  ) {
    return this.http.post(`${BASE_URL}/user/register`, userData);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status == 0) {
      console.log('An error occurred:', error.error);
    } else {
      console.log(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }

    return throwError(
      () => new Error('Somthing bad happened; please try again later.')
    );
  }
}
