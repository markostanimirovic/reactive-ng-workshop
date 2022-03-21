import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Author } from '@authors/models/author';
import { AuthorForm } from './author-form';

@Component({
  selector: 'app-author-form',
  templateUrl: './author-form.component.html',
  styleUrls: ['./author-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorFormComponent {
  authorId: number | undefined = undefined;
  authorForm = new AuthorForm();

  @Input()
  set author(author: Author | undefined) {
    this.authorId = author?.id;
    this.authorForm = new AuthorForm(author);
  }

  @Output() create = new EventEmitter<Omit<Author, 'id'>>();
  @Output() update = new EventEmitter<Author>();

  onSaveAuthor(): void {
    if (this.authorForm.invalid) {
      this.authorForm.markAllAsTouched();
      return;
    }

    if (this.authorId) {
      this.update.emit({ ...this.authorForm.getValue(), id: this.authorId });
    } else {
      this.create.emit(this.authorForm.getValue());
    }
  }
}
