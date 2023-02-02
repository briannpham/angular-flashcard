import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { FlashCard } from '../models/flashcard';
import { UserService } from './user.service';

const BASE_URL = 'http://localhost:3000/api';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `my-auth-token`,
  }),
};

@Injectable({
  providedIn: 'root',
})
export class FlashcardsService {
  constructor(private http: HttpClient, private userService: UserService) {}

  getCards(userToken: string) {
    httpOptions.headers = httpOptions.headers.set(
      'Authorization',
      `Bearer ${userToken}`
    );
    return this.http
      .get<FlashCard[]>(`${BASE_URL}/cards`, httpOptions)
      .pipe(catchError(this.handleError));
  }

  createCard(card: FlashCard): Observable<FlashCard> {
    return this.http
      .post<FlashCard>(`${BASE_URL}/cards/create`, card, httpOptions)
      .pipe(catchError(this.handleError));
  }

  updateCard(card: FlashCard) {
    return this.http
      .patch(`${BASE_URL}/cards/${card._id}`, card, httpOptions)
      .pipe(catchError(this.handleError));
  }

  deleteCard(id: string) {
    return this.http
      .delete(`${BASE_URL}/cards/${id}`, httpOptions)
      .pipe(catchError(this.handleError));
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
