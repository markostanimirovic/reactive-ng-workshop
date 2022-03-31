import { createAction, props } from '@ngrx/store';
import { Author } from '@authors/models/author';

export const opened = createAction('[Authors Page] Opened');
export const refreshClicked = createAction(
  '[Authors Page] Refresh Button Clicked'
);
export const queryChanged = createAction(
  '[Authors Page] Query Changed',
  props<{ query: string }>()
);
export const deleteClicked = createAction(
  '[Authors Page] Delete Button Clicked',
  props<{ author: Author }>()
);
