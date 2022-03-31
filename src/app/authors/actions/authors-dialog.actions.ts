import { createAction, props } from '@ngrx/store';
import { Author } from '@authors/models/author';

export const deleteConfirmed = createAction(
  '[Authors Dialog] Delete Confirmed',
  props<{ author: Author }>()
);

export const deleteCanceled = createAction(
  '[Authors Dialog] Delete Canceled',
  props<{ author: Author }>()
);
