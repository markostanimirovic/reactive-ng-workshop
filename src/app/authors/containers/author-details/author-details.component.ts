import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs';
import { Author } from '@authors/models/author';
import { AuthorsService } from '@authors/services/authors.service';
import { AlertService } from '@shared/alert/alert.service';

@Component({
  selector: 'app-author-details',
  templateUrl: './author-details.component.html',
  styleUrls: ['./author-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorDetailsComponent {
  readonly vm$ = this.route.data.pipe(
    map((data) => ({ author: data['author'] as Author | undefined }))
  );

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly authorsService: AuthorsService,
    private readonly alertService: AlertService
  ) {}

  onCreate(author: Omit<Author, 'id'>): void {
    this.authorsService.create(author).subscribe({
      next: (author) => {
        this.alertService.success(
          `Author ${author.firstName} ${author.lastName} is successfully created.`
        );
        this.router.navigate(['/authors', author.id], { state: { author } });
      },
      error: (err: HttpErrorResponse) => this.alertService.error(err.message),
    });
  }

  onUpdate(author: Author): void {
    this.authorsService.update(author).subscribe({
      next: () => {
        this.alertService.success(
          `Author ${author.firstName} ${author.lastName} is successfully updated.`
        );
        this.router.navigateByUrl('/authors');
      },
      error: (err: HttpErrorResponse) => this.alertService.error(err.message),
    });
  }
}
