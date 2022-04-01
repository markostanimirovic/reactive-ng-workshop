import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { authorsApiActions } from '@authors/actions';

@Injectable()
export class AuthorsNavigationEffects {
  readonly navigateToUpdateAuthorPage$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(authorsApiActions.authorCreatedSuccess),
        tap(({ author }) => this.router.navigate(['/authors', author.id]))
      );
    },
    { dispatch: false }
  );

  readonly navigateToAuthorsPage$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(authorsApiActions.authorUpdatedSuccess),
        tap(() => this.router.navigateByUrl('/authors'))
      );
    },
    { dispatch: false }
  );

  constructor(
    private readonly actions$: Actions,
    private readonly router: Router
  ) {}
}
