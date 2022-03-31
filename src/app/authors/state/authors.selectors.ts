import { createFeatureSelector, createSelector } from '@ngrx/store';
import { fromAuthors } from './index';

export const selectAuthorsState = createFeatureSelector<fromAuthors.State>(
  fromAuthors.featureName
);

export const selectAuthors = createSelector(
  selectAuthorsState,
  (state) => state.authors
);

export const selectQuery = createSelector(
  selectAuthorsState,
  (state) => state.query
);

export const selectIsLoading = createSelector(
  selectAuthorsState,
  (state) => state.isLoading
);

export const selectAuthorById = (authorId: number) =>
  createSelector(selectAuthors, (authors) =>
    authors.find(({ id }) => id === authorId)
  );
