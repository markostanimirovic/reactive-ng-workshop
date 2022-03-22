import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { Author } from '@authors/models/author';
import { AuthorsStore } from './authors.store';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss'],
  providers: [AuthorsStore],
})
export class AuthorsComponent implements OnInit {
  readonly vm$ = this.authorsStore.vm$;

  constructor(
    private readonly authorsStore: AuthorsStore,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.authorsStore.init();
  }

  onQueryChange(query: string): void {
    this.authorsStore.patchState({ query });
  }

  onRefreshAuthors(): void {
    const query$ = this.authorsStore.query$.pipe(take(1));
    this.authorsStore.loadAuthors(query$);
  }

  onEditAuthor(author: Author): void {
    this.router.navigate(['/authors', author.id], { state: { author } });
  }

  onDeleteAuthor(author: Author): void {
    this.authorsStore.openDeleteAuthorDialog(author);
  }
}
