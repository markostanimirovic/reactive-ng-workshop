import { Component, Input } from '@angular/core';
import { BookWithAuthor } from '@books/models/book';

@Component({
  selector: 'app-books-table',
  templateUrl: './books-table.component.html',
  styleUrls: ['./books-table.component.scss'],
})
export class BooksTableComponent {
  readonly displayedColumns = ['title', 'genre', 'author', 'publishedDate'];

  @Input() books: BookWithAuthor[] = [];
  @Input() isLoading = false;
}
