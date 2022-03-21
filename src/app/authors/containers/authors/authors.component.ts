import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import {
  catchError,
  concatMap,
  debounceTime,
  distinctUntilChanged,
  filter,
  of,
  startWith,
  Subject,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { AuthorsService } from '@authors/services/authors.service';
import { Author } from '@authors/models/author';
import { ConfirmDialogService } from '@shared/confirm-dialog/confirm-dialog.service';
import { AlertService } from '@shared/alert/alert.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss'],
})
export class AuthorsComponent implements OnInit, OnDestroy {
  readonly destroy$ = new Subject<void>();
  readonly queryControl = new FormControl('');
  authors: Author[] = [];
  isLoading = false;

  constructor(
    private readonly authorsService: AuthorsService,
    private readonly confirmDialogService: ConfirmDialogService,
    private readonly alertService: AlertService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.queryControl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => (this.isLoading = true)),
        switchMap((query) =>
          this.authorsService.get(query).pipe(
            catchError((err: HttpErrorResponse) => {
              this.alertService.error(err.message);
              return of([] as Author[]);
            })
          )
        ),
        takeUntil(this.destroy$)
      )
      .subscribe((authors) => {
        this.authors = authors;
        this.isLoading = false;
      });
  }

  onRefreshAuthors(): void {
    this.isLoading = true;
    this.authorsService.get(this.queryControl.value).subscribe({
      next: (authors) => {
        this.isLoading = false;
        this.authors = authors;
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading = false;
        this.alertService.error(err.message);
      },
    });
  }

  onEditAuthor(author: Author): void {
    this.router.navigate(['/authors', author.id], { state: { author } });
  }

  onDeleteAuthor(author: Author): void {
    this.confirmDialogService
      .open({
        title: 'Confirm Deletion',
        message: `Do you want to delete author ${author.firstName} ${author.lastName}?`,
      })
      .pipe(
        filter(Boolean),
        concatMap(() => this.authorsService.delete(author.id))
      )
      .subscribe({
        next: (id) => {
          this.alertService.success(
            `Author ${author.firstName} ${author.lastName} is successfully deleted.`
          );
          this.authors = this.authors.filter((a) => a.id !== id);
        },
        error: (err: HttpErrorResponse) => this.alertService.error(err.message),
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
