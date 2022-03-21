import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  exports: [MatProgressSpinnerModule, MatTableModule],
})
export class BooksMaterialModule {}
