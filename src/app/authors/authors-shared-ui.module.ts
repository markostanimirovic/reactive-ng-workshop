import { NgModule } from '@angular/core';
import { AuthorNamePipe } from './pipes/author-name.pipe';

@NgModule({
  declarations: [AuthorNamePipe],
  exports: [AuthorNamePipe],
})
export class AuthorsSharedUiModule {}
