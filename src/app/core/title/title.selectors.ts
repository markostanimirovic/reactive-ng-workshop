import { createSelector } from '@ngrx/store';
import { routerSelectors } from '@shared/router/router.selectors';

export const selectPageTitle = createSelector(
  routerSelectors.selectRouteData,
  (data) => {
    const titlePrefix = 'Reactive Angular';
    const title = data['title'] as string | undefined;

    return title ? `${titlePrefix} | ${title}` : titlePrefix;
  }
);
