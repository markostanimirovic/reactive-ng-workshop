import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogModule } from '@shared/confirm-dialog/confirm-dialog.module';
import { AlertModule } from '@shared/alert/alert.module';
import { SearchBoxModule } from '@shared/search-box/search-box.module';
import { EntityModule } from '@shared/entity/entity.module';
import { AuthorsRoutingModule } from './authors-routing.module';
import { AuthorsMaterialModule } from './authors-material.module';
import { AuthorsSharedUiModule } from './authors-shared-ui.module';
import { AuthorDetailsComponent } from './containers/author-details/author-details.component';
import { AuthorsComponent } from './containers/authors/authors.component';
import { AuthorFormComponent } from './components/author-form/author-form.component';
import { AuthorsHeaderComponent } from './components/authors-header/authors-header.component';
import { AuthorListComponent } from './components/author-list/author-list.component';

@NgModule({
  declarations: [
    AuthorDetailsComponent,
    AuthorsComponent,
    AuthorFormComponent,
    AuthorsHeaderComponent,
    AuthorListComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthorsRoutingModule,
    AuthorsMaterialModule,
    AuthorsSharedUiModule,
    ConfirmDialogModule,
    AlertModule,
    SearchBoxModule,
    EntityModule,
  ],
})
export class AuthorsModule {}
