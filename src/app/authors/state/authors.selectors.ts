import { createSelector } from '@ngrx/store';
import { routerSelectors } from '@shared/router/router.selectors';
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

export const selectAuthorFromRoute = createSelector(
  routerSelectors.selectRouteParam('id'),
  selectEntities,
  (authorId, authors) => (authorId ? authors[authorId] : undefined)
);
