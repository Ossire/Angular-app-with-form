import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  handleError(errorhttp: HttpErrorResponse) {
    let errorMessage = 'Something went wrong!';

    if (errorhttp.error instanceof ErrorEvent) {
      errorMessage = `Network error: ${errorhttp.error.message} `;
    } else {
      // It's a "Server-side" error (the database said no)
      switch (errorhttp.status) {
        case 400:
          errorMessage = 'Bad Request. Please check your input.';
          break;
        case 401:
          errorMessage = 'You are not logged in!';
          break;
        case 403:
          errorMessage = 'Access denied. You cannot do that.';
          break;
        case 404:
          errorMessage = 'Not found. We could not find that item.';
          break;
        case 500:
          errorMessage = 'Server error. Our robots are fixing it.';
          break;
        default:
          errorMessage = `Error Code: ${errorhttp.status}\nMessage: ${errorhttp.message}`;
      }
    }

    return throwError(() => new Error(errorMessage));
  }
}
