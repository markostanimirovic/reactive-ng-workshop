import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Author } from '@authors/models/author';
import { authorDetailsPageActions } from '@authors/actions';
import { selectAuthorDetailsPageViewModel } from './author-details-page.selectors';

@Component({
  selector: 'app-author-details',
  templateUrl: './author-details.component.html',
  styleUrls: ['./author-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorDetailsComponent {
  readonly vm$ = this.store.select(selectAuthorDetailsPageViewModel);

  constructor(private readonly store: Store) {}

  onCreate(author: Omit<Author, 'id'>): void {
    this.store.dispatch(authorDetailsPageActions.createSubmitted({ author }));
  }

  onUpdate(author: Author): void {
    this.store.dispatch(authorDetailsPageActions.updateSubmitted({ author }));
  }
}
