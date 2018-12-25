import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, BehaviorSubject, ReplaySubject, throwError } from 'rxjs';
import { catchError, tap, map, share } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { NotificationService } from '../services/notification.service';
import { User, Credentials, AuthorizationResponse } from '../models/';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  public user$: ReplaySubject<User | null>;
  private ready$: BehaviorSubject<boolean>;

  constructor(
    private http: HttpClient,
    private notify: NotificationService
  ) {

    this.ready$ = new BehaviorSubject<boolean>(false);
    this.user$ = new ReplaySubject<User | null>(1);

  }

  // using for prevent app rendering untill user token is validated
  public isReady(): Observable<boolean> {
    if (!this.getToken()) {
      this.ready$.next(true);
    }

    return this.ready$.asObservable();
  }

  public isAuthorized(): Observable<boolean> {

    return this.user$.asObservable().pipe(
      map((user: User) => {
        if (user) {

          return true;
        }

        return false;
      })
    );
  }

  public getUser(): Observable<User | null> {

    return this.user$.asObservable();
  }

  private authResponseHandler(response: AuthorizationResponse): void {
    if (!!response.success) {
      this.saveToken(response.token);
      this.notify.show('Action success.');

    }
  }

  public login(credentials: Credentials): Observable<AuthorizationResponse> {

    return this.http.post<AuthorizationResponse>(`${ environment.api_url }/login`, credentials)
      .pipe(
        tap((response: AuthorizationResponse) => {
          this.authResponseHandler(response);
        }),
        catchError((error: HttpErrorResponse) => {

          return throwError(error);
        })
      );
  }

  public register(credentials: Credentials): Observable<AuthorizationResponse> {

    return this.http.post<AuthorizationResponse>(`${ environment.api_url }/auth`, credentials)
      .pipe(
        tap((response: AuthorizationResponse) => {
          this.authResponseHandler(response);
        }),
        catchError((error: HttpErrorResponse) => {

          return throwError(error);
        })
    );
  }

  public fetchUser(): Observable<User> {

    return this.http.get<User>(`${ environment.api_url }/user`).pipe(
      tap((user: User) => {
        this.ready$.next(true);
        this.user$.next(user);
      })
    );
  }

  public logout (): void {

    this.user$.next(null);
    this.removeToken();
    this.notify.show('You\'re successfully logged out.');
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
