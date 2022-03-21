import { Entity } from '@shared/entity/entity';
import { Author } from '@authors/models/author';
import { BookGenre } from './book-genre';

export interface Book extends Entity {
  title: string;
  authorId?: number;
  genre: BookGenre;
  publishedDate: string;
}

export interface BookWithAuthor extends Book {
  author?: Author;
}
