import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { concatMap, filter, pipe, switchMap, tap } from 'rxjs';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Author } from '@authors/models/author';
import { AuthorsService } from '@authors/services/authors.service';
import { AlertService } from '@shared/alert/alert.service';
import { ConfirmDialogService } from '@shared/confirm-dialog/confirm-dialog.service';

interface State {
  query: string;
  authors: Author[];
  isLoading: boolean;
}

const initialState: State = {
  query: '',
  authors: [],
  isLoading: false,
};

@Injectable()
export class AuthorsStore extends ComponentStore<State> {
  readonly query$ = this.select((s) => s.query);
  readonly authors$ = this.select((s) => s.authors);
  readonly isLoading$ = this.select((s) => s.isLoading);

  readonly vm$ = this.select(
    this.query$,
    this.authors$,
    this.isLoading$,
    (query, authors, isLoading) => ({ query, authors, isLoading }),
    { debounce: true }
  );

  constructor(
    private readonly authorsService: AuthorsService,
    private readonly alertService: AlertService,
    private readonly confirmDialogService: ConfirmDialogService
  ) {
    super(initialState);
  }

  init(): void {
    this.loadAuthors(this.query$);
  }

  readonly loadAuthors = this.effect<string>(
    pipe(
      tap(() => this.patchState({ isLoading: true })),
      switchMap((query) =>
        this.authorsService.get(query).pipe(
          tapResponse(
            (authors) => this.patchState({ authors, isLoading: false }),
            (err: HttpErrorResponse) => {
              this.patchState({ authors: [], isLoading: false });
              this.alertService.error(err.message);
            }
          )
        )
      )
    )
  );

  readonly openDeleteAuthorDialog = this.effect<Author>(
    concatMap((author) =>
      this.confirmDialogService
        .open({
          title: 'Confirm Deletion',
          message: `Do you want to delete author ${author.firstName} ${author.lastName}?`,
        })
        .pipe(
          filter(Boolean),
          tap(() => this.deleteAuthor(author))
        )
    )
  );

  readonly deleteAuthor = this.effect<Author>(
    pipe(
      tap(() => this.patchState({ isLoading: true })),
      concatMap((author) =>
        this.authorsService.delete(author.id).pipe(
          tapResponse(
            (id) => {
              this.patchState(({ authors }) => ({
                authors: authors.filter((a) => a.id !== id),
                isLoading: false,
              }));
              this.alertService.success(
                `Author ${author.firstName} ${author.lastName} is successfully deleted.`
              );
            },
            (err: HttpErrorResponse) => {
              this.patchState({ isLoading: false });
              this.alertService.error(err.message);
            }
          )
        )
      )
    )
  );
}
