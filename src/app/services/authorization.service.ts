import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { RequestOptions } from '@angular/http';

import { Observable, BehaviorSubject, ReplaySubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { User, Credentials, AuthorizationResponse } from '../models/';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  // private user: BehaviorSubject<User>;
  private authorized: BehaviorSubject<boolean>;
  private user: ReplaySubject<User>;

  constructor(private http: HttpClient) {

    // this.user = new BehaviorSubject<User>(null);
    this.authorized = new BehaviorSubject<boolean>(false);
  }

  public isAuthorized(): Observable<boolean> {

    return this.authorized.asObservable();
  }

  public getUser(): Observable<User> {

    if (!this.user) {
      this.user = new ReplaySubject<User>(null);

      this.fetchUser()
        .subscribe((result) => {
          this.user.next(result);
        });
    }

    return this.user.asObservable();
  }

  public login(credentials: Credentials): Observable<AuthorizationResponse> {

    return this.http.post<AuthorizationResponse>('https://incode-store.herokuapp.com/login', credentials).pipe(
      tap((response: AuthorizationResponse) => {
        if (response.success === true) {
          this.saveToken(response.token);
          this.authorized.next(true);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  } 

  public register(credentials: Credentials): Observable<AuthorizationResponse> {

    return this.http.post<AuthorizationResponse>('https://incode-store.herokuapp.com/auth', credentials).pipe(
      tap((response: AuthorizationResponse) => {
        if (response.success === true) {
          this.saveToken(response.token);
          this.authorized.next(true);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  public fetchUser (): Observable<User> {

    return this.http.get<User>('https://incode-store.herokuapp.com/user');
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
