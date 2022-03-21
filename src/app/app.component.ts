import { Component, OnInit } from '@angular/core';
import { TitleService } from '@core/title/title.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private readonly titleService: TitleService) {}

  ngOnInit(): void {
    this.titleService.updateTitleOnRouteChanges();
  }
}
