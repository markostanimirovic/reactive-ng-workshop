import { NgModule } from '@angular/core';
import { TrackByIdDirective } from './track-by-id.directive';

@NgModule({
  declarations: [TrackByIdDirective],
  exports: [TrackByIdDirective],
})
export class EntityModule {}
