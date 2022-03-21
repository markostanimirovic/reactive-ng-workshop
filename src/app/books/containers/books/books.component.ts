import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { map, switchMap, tap } from 'rxjs';
import { BooksService } from '@books/services/books.service';
import { BookWithAuthor } from '@books/models/book';
import { toBooksWithAuthors } from '@books/helpers/books.mapper';
import { Author } from '@authors/models/author';
import { AuthorsService } from '@authors/services/authors.service';
import { toDictionary } from '@shared/entity/entity.mapper';
import { AlertService } from '@shared/alert/alert.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {
  query = '';
  currentPage = 1;
  pageSize = 10;
  totalCount = 0;

  books: BookWithAuthor[] = [];
  authors: Record<number, Author> = {};
  isLoading = false;

  constructor(
    private readonly booksService: BooksService,
    private readonly authorsService: AuthorsService,
    private readonly alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.loadBooksWithAuthors();
  }

  onQueryChange(query: string): void {
    this.query = query;
    this.currentPage = 1;
    this.loadBooks();
  }

  onCurrentPageChange(currentPage: number): void {
    this.currentPage = currentPage;
    this.loadBooks();
  }

  onPageSizeChange(pageSize: number): void {
    this.pageSize = pageSize;
    this.currentPage = 1;
    this.loadBooks();
  }

  private loadBooksWithAuthors(): void {
    this.isLoading = true;
    this.authorsService
      .get()
      .pipe(
        map(toDictionary),
        tap((authors) => (this.authors = authors)),
        switchMap(() =>
          this.booksService.get({
            query: this.query,
            currentPage: this.currentPage,
            pageSize: this.pageSize,
          })
        )
      )
      .subscribe({
        next: ({ books, totalCount }) => {
          this.books = toBooksWithAuthors(books, this.authors);
          this.totalCount = totalCount;
          this.isLoading = false;
        },
        error: (err: HttpErrorResponse) => {
          this.books = [];
          this.totalCount = 0;
          this.authors = {};
          this.isLoading = false;
          this.alertService.error(err.message);
        },
      });
  }

  private loadBooks(): void {
    this.isLoading = true;

    this.booksService
      .get({
        query: this.query,
        currentPage: this.currentPage,
        pageSize: this.pageSize,
      })
      .subscribe({
        next: ({ books, totalCount }) => {
          this.books = toBooksWithAuthors(books, this.authors);
          this.totalCount = totalCount;
          this.isLoading = false;
        },
        error: (err: HttpErrorResponse) => {
          this.books = [];
          this.totalCount = 0;
          this.isLoading = false;
          this.alertService.error(err.message);
        },
      });
  }
}
