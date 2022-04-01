import { createSelector } from '@ngrx/store';
import { authorsFeature } from './authors.reducer';

export const {
  selectAuthorsState,
  selectAuthors,
  selectIsLoading,
  selectQuery,
} = authorsFeature;

export const selectAuthorById = (authorId: number) =>
  createSelector(selectAuthors, (authors) =>
    authors.find(({ id }) => id === authorId)
  );
