import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Author } from '@authors/models/author';
import { authorsPageActions } from '@authors/actions';
import { selectAuthorsPageViewModel } from './authors-page.selectors';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorsComponent implements OnInit {
  readonly vm$ = this.store.select(selectAuthorsPageViewModel);

  constructor(private readonly store: Store, private readonly router: Router) {}

  ngOnInit(): void {
    this.store.dispatch(authorsPageActions.opened());
  }

  onQueryChange(query: string): void {
    this.store.dispatch(authorsPageActions.queryChanged({ query }));
  }

  onRefreshAuthors(): void {
    this.store.dispatch(authorsPageActions.refreshClicked());
  }

  onEditAuthor(author: Author): void {
    this.router.navigate(['/authors', author.id], { state: { author } });
  }

  onDeleteAuthor(author: Author): void {
    this.store.dispatch(authorsPageActions.deleteClicked({ author }));
  }
}
