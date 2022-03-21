import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { map, Observable } from 'rxjs';
import { Author } from '@authors/models/author';
import { HttpClient } from '@angular/common/http';

const AUTHORS_URL = `${environment.apiUrl}/authors`;

@Injectable({
  providedIn: 'root',
})
export class AuthorsService {
  constructor(private readonly http: HttpClient) {}

  get(query = ''): Observable<Author[]> {
    return this.http.get<Author[]>(AUTHORS_URL, { params: { q: query } });
  }

  getById(id: number): Observable<Author> {
    return this.http.get<Author>(`${AUTHORS_URL}/${id}`);
  }

  create(author: Omit<Author, 'id'>): Observable<Author> {
    return this.http.post<Author>(AUTHORS_URL, author);
  }

  update(author: Author): Observable<Author> {
    return this.http.put<Author>(`${AUTHORS_URL}/${author.id}`, author);
  }

  delete(id: number): Observable<number> {
    return this.http.delete<{}>(`${AUTHORS_URL}/${id}`).pipe(map(() => id));
  }
}
