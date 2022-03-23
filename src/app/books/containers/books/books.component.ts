import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BooksStore } from './books.store';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
  providers: [BooksStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooksComponent implements OnInit {
  readonly vm$ = this.booksStore.vm$;

  constructor(private readonly booksStore: BooksStore) {}

  ngOnInit(): void {
    this.booksStore.init();
  }

  onQueryChange(query: string): void {
    this.booksStore.patchState({ query, currentPage: 1 });
  }

  onCurrentPageChange(currentPage: number): void {
    this.booksStore.patchState({ currentPage });
  }

  onPageSizeChange(pageSize: number): void {
    this.booksStore.patchState({ pageSize, currentPage: 1 });
  }
}
