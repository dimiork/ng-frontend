import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { RequestOptions } from '@angular/http';

import { Observable, BehaviorSubject, ReplaySubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User, Credentials, AuthorizationResponse } from '../models/';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  private user: BehaviorSubject<User | null>;
  private authorized: BehaviorSubject<boolean>;

  constructor(private http: HttpClient) {

    this.authorized = new BehaviorSubject<boolean>(false);
  }

  public isAuthorized(): Observable<boolean> {

    return this.authorized.asObservable();
  }

  private authResponseHandler(response: AuthorizationResponse): void {
    if (response.success === true) {
      this.saveToken(response.token);
      this.authorized.next(true);
    }
  }

  public getUser(): Observable<User> {

    if (!this.user) {
      this.user = new BehaviorSubject<User>(null);

      return this.fetchUser().pipe(
          tap((result: User) => {
            this.user.next(result);
          })
        )
    }

    return this.user.asObservable();
  }

  public login(credentials: Credentials): Observable<AuthorizationResponse> {

    return this.http.post<AuthorizationResponse>(`${ environment.api_url }/login`, credentials).pipe(
      tap((response: AuthorizationResponse) => {
        this.authResponseHandler(response);
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  public register(credentials: Credentials): Observable<AuthorizationResponse> {

    return this.http.post<AuthorizationResponse>(`${ environment.api_url }/auth`, credentials).pipe(
      tap((response: AuthorizationResponse) => {
        this.authResponseHandler(response);
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  public fetchUser (): Observable<User> {

    return this.http.get<User>(`${ environment.api_url }/user`);
  }

  public logout (): void {

    this.authorized.next(false);
    this.user.next(null);
    this.removeToken();
  }

  private saveToken(token: string): void {

    localStorage.setItem('token', token);
  }

  private getToken(): string {

    return localStorage.getItem('token');
  }

  private removeToken(): void {

    localStorage.removeItem('token');
  }

}
