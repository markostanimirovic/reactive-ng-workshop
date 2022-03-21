import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorsSharedUiModule } from '@authors/authors-shared-ui.module';
import { SearchBoxModule } from '@shared/search-box/search-box.module';
import { AlertModule } from '@shared/alert/alert.module';
import { PaginationModule } from '@shared/pagination/pagination.module';
import { BooksRoutingModule } from './books-routing.module';
import { BooksMaterialModule } from './books-material.module';
import { BooksComponent } from './containers/books/books.component';
import { BooksTableComponent } from './components/books-table/books-table.component';

@NgModule({
  declarations: [BooksComponent, BooksTableComponent],
  imports: [
    CommonModule,
    BooksRoutingModule,
    BooksMaterialModule,
    AuthorsSharedUiModule,
    SearchBoxModule,
    AlertModule,
    PaginationModule,
  ],
})
export class BooksModule {}
