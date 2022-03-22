import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { pipe, switchMap, tap } from 'rxjs';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Book } from '@books/models/book';
import { BooksService } from '@books/services/books.service';
import { toBooksWithAuthors } from '@books/helpers/books.mapper';
import { Author } from '@authors/models/author';
import { AuthorsService } from '@authors/services/authors.service';
import { AlertService } from '@shared/alert/alert.service';
import { toDictionary } from '@shared/entity/entity.mapper';

interface State {
  query: string;
  currentPage: number;
  pageSize: number;
  totalCount: number;
  books: Book[];
  authors: Record<number, Author>;
  isLoadBooksPending: boolean;
  isLoadAuthorsPending: boolean;
}

const initialState: State = {
  query: '',
  currentPage: 1,
  pageSize: 10,
  totalCount: 0,
  books: [],
  authors: {},
  isLoadBooksPending: false,
  isLoadAuthorsPending: false,
};

@Injectable()
export class BooksStore extends ComponentStore<State> {
  readonly query$ = this.select((s) => s.query);
  readonly currentPage$ = this.select((s) => s.currentPage);
  readonly pageSize$ = this.select((s) => s.pageSize);
  readonly totalCount$ = this.select((s) => s.totalCount);
  readonly books$ = this.select((s) => s.books);
  readonly authors$ = this.select((s) => s.authors);
  readonly isLoadBooksPending$ = this.select((s) => s.isLoadBooksPending);
  readonly isLoadAuthorsPending$ = this.select((s) => s.isLoadAuthorsPending);

  readonly booksWithAuthors$ = this.select(
    this.books$,
    this.authors$,
    toBooksWithAuthors
  );
  readonly isLoading$ = this.select(
    this.isLoadBooksPending$,
    this.isLoadAuthorsPending$,
    (isLoadBooksPending, isLoadAuthorsPending) =>
      isLoadBooksPending || isLoadAuthorsPending
  );

  readonly vm$ = this.select(
    this.query$,
    this.currentPage$,
    this.pageSize$,
    this.totalCount$,
    this.booksWithAuthors$,
    this.isLoading$,
    (query, currentPage, pageSize, totalCount, books, isLoading) => ({
      query,
      currentPage,
      pageSize,
      totalCount,
      books,
      isLoading,
    }),
    { debounce: true }
  );

  readonly loadBooksParams$ = this.select(
    this.query$,
    this.currentPage$,
    this.pageSize$,
    (query, currentPage, pageSize) => ({ query, currentPage, pageSize }),
    { debounce: true }
  );

  constructor(
    private readonly booksService: BooksService,
    private readonly authorsService: AuthorsService,
    private readonly alertService: AlertService
  ) {
    super(initialState);
  }

  init(): void {
    this.loadAuthors();
    this.loadBooks(this.loadBooksParams$);
  }

  readonly loadAuthors = this.effect<void>(
    pipe(
      tap(() => this.patchState({ isLoadAuthorsPending: true })),
      switchMap(() =>
        this.authorsService.get().pipe(
          tapResponse(
            (authors) =>
              this.patchState({
                authors: toDictionary(authors),
                isLoadAuthorsPending: false,
              }),
            (err: HttpErrorResponse) => {
              this.patchState({ isLoadAuthorsPending: false });
              this.alertService.error(err.message);
            }
          )
        )
      )
    )
  );

  readonly loadBooks = this.effect<{
    query: string;
    currentPage: number;
    pageSize: number;
  }>(
    pipe(
      tap(() => this.patchState({ isLoadBooksPending: true })),
      switchMap((params) =>
        this.booksService.get(params).pipe(
          tapResponse(
            ({ books, totalCount }) => {
              this.patchState({ books, totalCount, isLoadBooksPending: false });
            },
            (err: HttpErrorResponse) => {
              this.patchState({
                books: [],
                totalCount: 0,
                isLoadBooksPending: false,
              });
              this.alertService.error(err.message);
            }
          )
        )
      )
    )
  );
}
