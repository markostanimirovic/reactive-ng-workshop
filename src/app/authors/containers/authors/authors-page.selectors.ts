import { createSelector } from '@ngrx/store';
import { authorsSelectors } from '@authors/state';

export const selectAuthorsPageViewModel = createSelector(
  authorsSelectors.selectAll,
  authorsSelectors.selectIsLoading,
  authorsSelectors.selectQuery,
  (authors, isLoading, query) => ({ authors, isLoading, query })
);
