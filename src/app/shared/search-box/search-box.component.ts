import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBoxComponent {
  readonly queryControl = new FormControl('');

  @Input() label = 'Search';

  @Input() set query(query: string) {
    this.queryControl.setValue(query, { emitEvent: false });
  }

  @Output() queryChange = this.queryControl.valueChanges.pipe(
    debounceTime(300),
    distinctUntilChanged()
  );
}
