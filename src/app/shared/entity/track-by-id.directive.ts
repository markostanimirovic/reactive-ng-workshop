import { Directive, Input } from '@angular/core';
import { NgForOf } from '@angular/common';
import { Entity } from './entity';

@Directive({
  selector: '[ngFor]', // eslint-disable-line @angular-eslint/directive-selector
})
export class TrackByIdDirective {
  @Input() set ngForTrackById(trackById: boolean) {
    if (trackById) {
      this.ngFor.ngForTrackBy = (_, item) => item.id;
    }
  }

  constructor(private readonly ngFor: NgForOf<Entity>) {}
}
