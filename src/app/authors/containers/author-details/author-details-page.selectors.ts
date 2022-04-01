import { createSelector } from '@ngrx/store';
import { authorsSelectors } from '@authors/state';

export const selectAuthorDetailsPageViewModel = createSelector(
  authorsSelectors.selectAuthorFromRoute,
  (author) => ({ author })
);
