import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Author } from '@authors/models/author';
import { toDateString } from '@shared/date/date.mapper';

export class AuthorForm extends FormGroup {
  readonly today = new Date();

  constructor(author?: Omit<Author, 'id'>) {
    super({
      firstName: new FormControl(author?.firstName, Validators.required),
      lastName: new FormControl(author?.lastName, Validators.required),
      birthDate: new FormControl(
        author?.birthDate && new Date(author.birthDate),
        Validators.required
      ),
    });
  }

  getValue(): Omit<Author, 'id'> {
    const birthDate =
      this.value.birthDate instanceof Date
        ? toDateString(this.value.birthDate)
        : this.value.birthDate;

    return { ...this.value, birthDate };
  }
}
