import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Book } from '@books/models/book';

const BOOKS_URL = `${environment.apiUrl}/books`;

interface GetBooksParams {
  query: string;
  currentPage: number;
  pageSize: number;
}

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  constructor(private readonly http: HttpClient) {}

  get(
    params: GetBooksParams
  ): Observable<{ books: Book[]; totalCount: number }> {
    const queryParams = {
      q: params.query,
      _page: params.currentPage,
      _limit: params.pageSize,
    };

    return this.http
      .get<Book[]>(BOOKS_URL, { params: queryParams, observe: 'response' })
      .pipe(
        map(({ body, headers }) => ({
          books: body ?? [],
          totalCount: Number(headers.get('x-total-count')),
        }))
      );
  }
}
