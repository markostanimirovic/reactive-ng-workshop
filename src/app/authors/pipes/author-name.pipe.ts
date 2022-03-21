import { Pipe, PipeTransform } from '@angular/core';
import { Author } from '@authors/models/author';

@Pipe({
  name: 'authorName',
  pure: true,
})
export class AuthorNamePipe implements PipeTransform {
  transform(author?: Author): string {
    return author ? `${author.firstName} ${author.lastName}` : '-';
  }
}
