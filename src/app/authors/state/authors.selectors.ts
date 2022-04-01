import { createSelector } from '@ngrx/store';
import { authorsFeature } from './authors.reducer';

export const {
  selectAuthorsState,
  selectAll,
  selectEntities,
  selectIsLoading,
  selectQuery,
} = authorsFeature;

export const selectAuthorById = (authorId: number) =>
  createSelector(selectEntities, (authors) => authors[authorId]);
