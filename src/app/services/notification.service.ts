import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private notifier: MatSnackBar) { }

  showNotification(msg: string, duration: number = 3000): void {
    this.notifier.open(msg, null, {
      duration: duration,
    });
  }
}
