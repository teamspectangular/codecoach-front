import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationHttpService {
  private url = `${environment.backendUrl}/authenticate`;

  constructor(private http: HttpClient) {
  }

  login(loginData): Observable<any> {
    return this.http.post<any>(this.url, loginData, {observe: 'response'}).pipe(
      catchError(this.handleError('authenticate'))
    );
  }

  private handleError(operation = 'operation') {
    return (error: any) => {
      return throwError(error);
    };
  }
}
