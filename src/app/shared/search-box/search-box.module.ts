import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { SearchBoxComponent } from './search-box.component';

@NgModule({
  declarations: [SearchBoxComponent],
  imports: [CommonModule, ReactiveFormsModule, MatInputModule],
  exports: [SearchBoxComponent],
})
export class SearchBoxModule {}
