import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogModule } from '@shared/confirm-dialog/confirm-dialog.module';
import { AlertModule } from '@shared/alert/alert.module';
import { AuthorsRoutingModule } from './authors-routing.module';
import { AuthorsMaterialModule } from './authors-material.module';
import { AuthorsSharedUiModule } from './authors-shared-ui.module';
import { AuthorDetailsComponent } from './containers/author-details/author-details.component';
import { AuthorsComponent } from './containers/authors/authors.component';
import { AuthorFormComponent } from './components/author-form/author-form.component';

@NgModule({
  declarations: [AuthorDetailsComponent, AuthorsComponent, AuthorFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthorsRoutingModule,
    AuthorsMaterialModule,
    AuthorsSharedUiModule,
    ConfirmDialogModule,
    AlertModule,
  ],
})
export class AuthorsModule {}
