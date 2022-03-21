import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map, Observable } from 'rxjs';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { ConfirmDialogData } from './confirm-dialog-data';
import { ConfirmDialogModule } from './confirm-dialog.module';

@Injectable({
  providedIn: ConfirmDialogModule,
})
export class ConfirmDialogService {
  constructor(private readonly matDialogService: MatDialog) {}

  open(data: ConfirmDialogData): Observable<boolean> {
    return this.matDialogService
      .open(ConfirmDialogComponent, { data })
      .afterClosed()
      .pipe(map((result) => !!result));
  }
}
