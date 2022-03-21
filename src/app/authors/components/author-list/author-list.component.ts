import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Author } from '@authors/models/author';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.scss'],
})
export class AuthorListComponent {
  @Input() authors: Author[] = [];
  @Input() isLoading = false;

  @Output() editAuthor = new EventEmitter<Author>();
  @Output() deleteAuthor = new EventEmitter<Author>();
}
