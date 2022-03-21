import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorsComponent } from './containers/authors/authors.component';
import { AuthorDetailsComponent } from './containers/author-details/author-details.component';
import { AuthorResolver } from './resolvers/author.resolver';

const routes: Routes = [
  { path: '', component: AuthorsComponent, data: { title: 'Authors' } },
  {
    path: 'create',
    component: AuthorDetailsComponent,
    data: { title: 'Create Author' },
  },
  {
    path: ':id',
    component: AuthorDetailsComponent,
    data: { title: 'Author Details' },
    resolve: { author: AuthorResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthorsRoutingModule {}
