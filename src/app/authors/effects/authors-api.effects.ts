import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import {
  catchError,
  concatMap,
  filter,
  map,
  mergeMap,
  of,
  switchMap,
} from 'rxjs';
import { Store } from '@ngrx/store';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { AuthorsService } from '@authors/services/authors.service';
import { authorsSelectors } from '@authors/state';
import {
  authorsApiActions,
  authorsPageActions,
  authorsDialogActions,
  authorExistsGuardActions,
} from '@authors/actions';

@Injectable()
export class AuthorsApiEffects {
  readonly loadAuthors$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        authorsPageActions.opened,
        authorsPageActions.refreshClicked,
        authorsPageActions.queryChanged
      ),
      concatLatestFrom(() => this.store.select(authorsSelectors.selectQuery)),
      switchMap(([, query]) => {
        return this.authorsService.get(query).pipe(
          map((authors) => authorsApiActions.authorsLoadedSuccess({ authors })),
          catchError((err: HttpErrorResponse) =>
            of(authorsApiActions.authorsLoadedFailure({ message: err.message }))
          )
        );
      })
    );
  });

  readonly loadAuthorIfNotLoaded$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authorExistsGuardActions.entered),
      concatLatestFrom(({ authorId }) =>
        this.store.select(authorsSelectors.selectAuthorById(authorId))
      ),
      filter(([, author]) => !author),
      mergeMap(([{ authorId }]) => {
        return this.authorsService.getById(authorId).pipe(
          map((author) => authorsApiActions.authorLoadedSuccess({ author })),
          catchError((err: HttpErrorResponse) =>
            of(
              authorsApiActions.authorLoadedFailure({
                message: err.message,
                authorId,
              })
            )
          )
        );
      })
    );
  });

  readonly deleteAuthor$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authorsDialogActions.deleteConfirmed),
      concatMap(({ author }) => {
        return this.authorsService.delete(author.id).pipe(
          map(() => authorsApiActions.authorDeletedSuccess({ author })),
          catchError((err: HttpErrorResponse) =>
            of(
              authorsApiActions.authorDeletedFailure({
                message: err.message,
                author,
              })
            )
          )
        );
      })
    );
  });

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store,
    private readonly authorsService: AuthorsService
  ) {}
}
