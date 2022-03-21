import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map, tap } from 'rxjs';

const TITLE_PREFIX = 'Reactive Angular';

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  constructor(
    private readonly router: Router,
    private readonly titleService: Title
  ) {}

  updateTitleOnRouteChanges(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let route = this.router.routerState.root;

          while (route.firstChild) {
            route = route.firstChild;
          }

          const title = route.snapshot.data['title'];
          return title ? `${TITLE_PREFIX} | ${title}` : TITLE_PREFIX;
        }),
        tap((title) => this.titleService.setTitle(title))
      )
      .subscribe();
  }
}
