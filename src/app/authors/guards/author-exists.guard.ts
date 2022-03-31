import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  UrlTree,
} from '@angular/router';
import { filter, map, Observable, race, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { authorExistsGuardActions, authorsApiActions } from '@authors/actions';
import { selectAuthorById } from '@authors/state/authors.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthorExistsGuard implements CanActivate {
  constructor(
    private readonly store: Store,
    private readonly actions$: Actions,
    private readonly router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot
  ): Observable<true | UrlTree> | UrlTree {
    const authorId = Number(route.params['id']);
    const notFoundUrl = this.router.parseUrl('/not-found');

    if (!authorId) {
      return notFoundUrl;
    }

    this.store.dispatch(authorExistsGuardActions.entered({ authorId }));

    return this.hasAuthorInStore(authorId).pipe(
      map((authorExists) => authorExists || notFoundUrl),
      take(1)
    );
  }

  private hasAuthorInStore(authorId: number): Observable<boolean> {
    return race(
      this.store.select(selectAuthorById(authorId)).pipe(
        filter(Boolean),
        map(() => true)
      ),
      this.actions$.pipe(
        ofType(authorsApiActions.authorLoadedFailure),
        filter((action) => action.authorId === authorId),
        map(() => false)
      )
    );
  }
}
