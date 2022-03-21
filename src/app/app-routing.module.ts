import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '@home/home.component';
import { NotFoundComponent } from '@core/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  { path: 'home', component: HomeComponent, data: { title: 'Home' } },
  {
    path: 'authors',
    loadChildren: () =>
      import('@authors/authors.module').then((m) => m.AuthorsModule),
  },
  {
    path: 'books',
    loadChildren: () =>
      import('@books/books.module').then((m) => m.BooksModule),
  },
  { path: '**', component: NotFoundComponent, data: { title: 'Not Found' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
