import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { RequestOptions } from '@angular/http';

import { Observable, BehaviorSubject, ReplaySubject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { User, Credentials, AuthResponse } from '../models/';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // private user: BehaviorSubject<User>;
  private authorized: BehaviorSubject<boolean>;
  private cachingUser: ReplaySubject<User>;

  constructor(private http: HttpClient) {

    // this.user = new BehaviorSubject<User>(null);
    this.authorized = new BehaviorSubject<boolean>(false);
  }

  public isAuthorized(): Observable<boolean> {

    return this.authorized.asObservable();
  }

  public getUser(): Observable<User> {

    if (!this.cachingUser) {
      this.cachingUser = new ReplaySubject<User>(null);

      this.fetchUser()
        .subscribe((result) => {
          this.cachingUser.next(result);
        });
    }

    return this.cachingUser.asObservable();
  }

  public login(credentials: Credentials): Observable<AuthResponse> {

    return this.http.post<AuthResponse>('https://incode-store.herokuapp.com/login', credentials).pipe(
      map((response: AuthResponse) => {
        if (response.success === true) {
          this.saveToken(response.token);
          this.authorized.next(true);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        return Observable.throwError(error);
      })
    );
  }

  public register(credentials: Credentials): Observable<AuthResponse> {

    return this.http.post<AuthResponse>('https://incode-store.herokuapp.com/auth', credentials).pipe(
      map((response: AuthResponse) => {
        if (response.success === true) {
          this.saveToken(response.token);
          this.authorized.next(true);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        return Observable.throwError(error);
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
