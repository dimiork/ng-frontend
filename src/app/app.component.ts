import { Component } from '@angular/core';

import { Observable } from 'rxjs';

import { AuthorizationService } from './services/authorization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title: string = 'ng-frontend';
  isReady: Observable<boolean>;

  constructor(private authService: AuthorizationService) {

    this.isReady = this.authService.isReady();
 }

}
