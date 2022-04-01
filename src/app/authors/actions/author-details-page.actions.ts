import { createAction, props } from '@ngrx/store';
import { Author } from '@authors/models/author';

export const createSubmitted = createAction(
  '[Author Details Page] Create Author Form Submitted',
  props<{ author: Omit<Author, 'id'> }>()
);
export const updateSubmitted = createAction(
  '[Author Details Page] Update Author Form Submitted',
  props<{ author: Author }>()
);
