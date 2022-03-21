import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { concatMap, filter, Subject, takeUntil } from 'rxjs';
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
  query = '';
  authors: Author[] = [];
  isLoading = false;

  constructor(
    private readonly authorsService: AuthorsService,
    private readonly confirmDialogService: ConfirmDialogService,
    private readonly alertService: AlertService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.loadAuthors();
  }

  onQueryChange(query: string): void {
    this.query = query;
    this.loadAuthors();
  }

  onRefreshAuthors(): void {
    this.loadAuthors();
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

  private loadAuthors(): void {
    this.isLoading = true;
    this.authorsService
      .get(this.query)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
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
}
