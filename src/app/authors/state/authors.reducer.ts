import { createReducer, on } from '@ngrx/store';
import { Author } from '@authors/models/author';
import {
  authorsPageActions,
  authorsApiActions,
  authorsDialogActions,
} from '@authors/actions';

export interface State {
  query: string;
  authors: Author[];
  isLoading: boolean;
}

const initialState: State = {
  query: '',
  authors: [],
  isLoading: false,
};

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
  on(authorsApiActions.authorsLoadedSuccess, (state, { authors }) => ({
    ...state,
    authors,
    isLoading: false,
  })),
  on(authorsApiActions.authorsLoadedFailure, (state) => ({
    ...state,
    authors: [],
    isLoading: false,
  })),
  on(authorsApiActions.authorLoadedSuccess, (state, { author }) => ({
    ...state,
    authors: Array.from(new Set([...state.authors, author])),
  })),
  on(authorsApiActions.authorDeletedSuccess, (state, { author }) => ({
    ...state,
    authors: state.authors.filter((a) => a.id !== author.id),
    isLoading: false,
  })),
  on(authorsApiActions.authorDeletedFailure, (state) => ({
    ...state,
    isLoading: false,
  })),
  on(authorsApiActions.authorCreatedSuccess, (state, { author }) => ({
    ...state,
    authors: [...state.authors, author],
  })),
  on(authorsApiActions.authorUpdatedSuccess, (state, { author }) => ({
    ...state,
    authors: state.authors.map((a) => (a.id === author.id ? author : a)),
  }))
);

export const featureName = 'authors';
