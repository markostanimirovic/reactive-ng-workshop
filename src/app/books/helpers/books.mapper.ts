import { BookWithAuthor, Book } from '@books/models/book';
import { Author } from '@authors/models/author';

export function toBooksWithAuthors(
  books: Book[],
  authors: Record<number, Author>
): BookWithAuthor[] {
  return books.map((book) => toBookWithAuthor(book, authors));
}

export function toBookWithAuthor(
  book: Book,
  authors: Record<number, Author>
): BookWithAuthor {
  return {
    ...book,
    author: book.authorId ? authors[book.authorId] : undefined,
  };
}
