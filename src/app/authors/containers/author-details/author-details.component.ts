import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { Author } from '@authors/models/author';
import { authorsSelectors } from '@authors/state';
import { authorDetailsPageActions } from '@authors/actions';

@Component({
  selector: 'app-author-details',
  templateUrl: './author-details.component.html',
  styleUrls: ['./author-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorDetailsComponent {
  readonly vm$ = this.route.params.pipe(
    map((params) => Number(params['id'])),
    switchMap((authorId) => {
      return this.store.select(authorsSelectors.selectAuthorById(authorId));
    }),
    map((author) => ({ author }))
  );

  constructor(
    private readonly store: Store,
    private readonly route: ActivatedRoute
  ) {}

  onCreate(author: Omit<Author, 'id'>): void {
    this.store.dispatch(authorDetailsPageActions.createSubmitted({ author }));
  }

  onUpdate(author: Author): void {
    this.store.dispatch(authorDetailsPageActions.updateSubmitted({ author }));
  }
}
