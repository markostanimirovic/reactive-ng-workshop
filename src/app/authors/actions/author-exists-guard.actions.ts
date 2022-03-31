import { createAction, props } from '@ngrx/store';

export const entered = createAction(
  '[Author Exists Guard] Can Activate Entered',
  props<{ authorId: number }>()
);
