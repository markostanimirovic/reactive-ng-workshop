import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Author } from '@authors/models/author';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorListComponent {
  @Input() authors: Author[] = [];

  @Output() editAuthor = new EventEmitter<Author>();
  @Output() deleteAuthor = new EventEmitter<Author>();

  trackById(_index: number, author: Author): number {
    return author.id;
  }
}
