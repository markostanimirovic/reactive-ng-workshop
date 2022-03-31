import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { AlertService } from '@shared/alert/alert.service';
import { authorsApiActions } from '@authors/actions';

@Injectable()
export class AuthorsAlertEffects {
  readonly showErrorAlert$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(
          authorsApiActions.authorsLoadedFailure,
          authorsApiActions.authorLoadedFailure,
          authorsApiActions.authorDeletedFailure
        ),
        tap(({ message }) => this.alertService.error(message))
      );
    },
    { dispatch: false }
  );

  readonly showDeleteSuccessAlert$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(authorsApiActions.authorDeletedSuccess),
        tap(({ author }) =>
          this.alertService.success(
            `Author ${author.firstName} ${author.lastName} is successfully deleted.`
          )
        )
      );
    },
    { dispatch: false }
  );

  constructor(
    private readonly actions$: Actions,
    private readonly alertService: AlertService
  ) {}
}
