import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Author } from '@authors/models/author';
import { AuthorsService } from '@authors/services/authors.service';

@Injectable({
  providedIn: 'root',
})
export class AuthorResolver implements Resolve<Author> {
  constructor(
    private readonly authorsService: AuthorsService,
    private readonly router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Author> | Author {
    const id = Number(route.params['id']);
    return this.getAuthorFromState() ?? this.getAuthorFromApi(id);
  }

  getAuthorFromState(): Author | undefined {
    return this.router.getCurrentNavigation()?.extras.state?.['author'];
  }

  getAuthorFromApi(id: number): Observable<Author> {
    return this.authorsService.getById(id).pipe(
      catchError((err: HttpErrorResponse) => {
        this.router.navigateByUrl('/not-found');
        return throwError(() => err);
      })
    );
  }
}
