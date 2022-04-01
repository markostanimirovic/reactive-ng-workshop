import { createAction, props } from '@ngrx/store';
import { Author } from '@authors/models/author';

export const authorsLoadedSuccess = createAction(
  '[Authors API] Authors Loaded Successfully',
  props<{ authors: Author[] }>()
);
export const authorsLoadedFailure = createAction(
  '[Authors API] Failed to Load Authors',
  props<{ message: string }>()
);

export const authorLoadedSuccess = createAction(
  '[Authors API] Author Loaded Successfully',
  props<{ author: Author }>()
);
export const authorLoadedFailure = createAction(
  '[Authors API] Failed to Load Author',
  props<{ authorId: number; message: string }>()
);

export const authorDeletedSuccess = createAction(
  '[Authors API] Author Deleted Successfully',
  props<{ author: Author }>()
);
export const authorDeletedFailure = createAction(
  '[Authors API] Failed to Delete Author',
  props<{ author: Author; message: string }>()
);

export const authorCreatedSuccess = createAction(
  '[Authors API] Author Created Successfully',
  props<{ author: Author }>()
);
export const authorCreatedFailure = createAction(
  '[Authors API] Failed to Create Author',
  props<{ message: string }>()
);

export const authorUpdatedSuccess = createAction(
  '[Authors API] Author Updated Successfully',
  props<{ author: Author }>()
);
export const authorUpdatedFailure = createAction(
  '[Authors API] Failed to Update Author',
  props<{ message: string }>()
);
