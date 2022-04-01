import { createFeature, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Author } from '@authors/models/author';
import {
  authorsPageActions,
  authorsApiActions,
  authorsDialogActions,
} from '@authors/actions';

interface State extends EntityState<Author> {
  query: string;
  isLoading: boolean;
}

const adapter = createEntityAdapter<Author>();

const initialState: State = adapter.getInitialState({
  query: '',
  isLoading: false,
});

export const reducer = createReducer(
  initialState,
  on(
    authorsPageActions.opened,
    authorsPageActions.refreshClicked,
    authorsDialogActions.deleteConfirmed,
    (state) => ({
      ...state,
      isLoading: true,
    })
  ),
  on(authorsPageActions.queryChanged, (state, { query }) => ({
    ...state,
    query,
    isLoading: true,
  })),
  on(authorsApiActions.authorsLoadedSuccess, (state, { authors }) =>
    adapter.setAll(authors, {
      ...state,
      isLoading: false,
    })
  ),
  on(authorsApiActions.authorsLoadedFailure, (state) =>
    adapter.removeAll({ ...state, isLoading: false })
  ),
  on(
    authorsApiActions.authorLoadedSuccess,
    authorsApiActions.authorCreatedSuccess,
    authorsApiActions.authorUpdatedSuccess,
    (state, { author }) => adapter.setOne(author, state)
  ),
  on(authorsApiActions.authorDeletedSuccess, (state, { author }) =>
    adapter.removeOne(author.id, {
      ...state,
      isLoading: false,
    })
  ),
  on(authorsApiActions.authorDeletedFailure, (state) => ({
    ...state,
    isLoading: false,
  }))
);

const feature = createFeature({ name: 'authors', reducer });
const { selectAll } = adapter.getSelectors(feature.selectAuthorsState);

export const authorsFeature = { ...feature, selectAll };
