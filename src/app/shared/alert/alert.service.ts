import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { AlertModule } from '@shared/alert/alert.module';

const DEFAULT_ALERT_CONFIG: MatSnackBarConfig = {
  duration: 3000,
  verticalPosition: 'bottom',
  horizontalPosition: 'left',
};

@Injectable({
  providedIn: AlertModule,
})
export class AlertService {
  constructor(private readonly snackbar: MatSnackBar) {}

  success(message: string): void {
    this.snackbar.open(message, undefined, {
      ...DEFAULT_ALERT_CONFIG,
      panelClass: 'success-alert',
    });
  }

  error(message: string): void {
    this.snackbar.open(message, undefined, {
      ...DEFAULT_ALERT_CONFIG,
      panelClass: 'error-alert',
    });
  }
}
