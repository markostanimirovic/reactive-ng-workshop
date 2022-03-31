import { Injectable } from '@angular/core';
import { concatMap, map } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ConfirmDialogService } from '@shared/confirm-dialog/confirm-dialog.service';
import { authorsDialogActions, authorsPageActions } from '@authors/actions';

@Injectable()
export class AuthorsDialogEffects {
  readonly openConfirmDeleteDialog$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authorsPageActions.deleteClicked),
      concatMap(({ author }) => {
        return this.confirmDialogService
          .open({
            title: 'Confirm Deletion',
            message: `Do you want to delete author ${author.firstName} ${author.lastName}?`,
          })
          .pipe(
            map((isConfirmed) =>
              isConfirmed
                ? authorsDialogActions.deleteConfirmed({ author })
                : authorsDialogActions.deleteCanceled({ author })
            )
          );
      })
    );
  });

  constructor(
    private readonly actions$: Actions,
    private readonly confirmDialogService: ConfirmDialogService
  ) {}
}
