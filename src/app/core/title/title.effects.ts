import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { routerNavigatedAction } from '@ngrx/router-store';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { selectPageTitle } from './title.selectors';

@Injectable()
export class TitleEffects {
  readonly updatePageTitle$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(routerNavigatedAction),
        concatLatestFrom(() => this.store.select(selectPageTitle)),
        tap(([, title]) => this.titleService.setTitle(title))
      );
    },
    { dispatch: false }
  );

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store,
    private readonly titleService: Title
  ) {}
}
