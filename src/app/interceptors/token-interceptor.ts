import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

import { Observable } from 'rxjs';


@Injectable({
	providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

	constructor() {}

	intercept(
		request: HttpRequest<any>,
		next: HttpHandler): Observable<HttpEvent<any>> {

		let tokenizedRequest = request.clone({
			setHeaders: {
				Authirization: `Bearer ${localStorage.getItem('token')}`
			}
		});

		return next.handle(tokenizedRequest);
	}
}