import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthorsAlertEffects } from '@authors/effects/authors-alert.effects';
import { AuthorsApiEffects } from '@authors/effects/authors-api.effects';
import { AuthorsDialogEffects } from '@authors/effects/authors-dialog.effects';
import { fromAuthors } from '@authors/state';

@NgModule({
  imports: [
    StoreModule.forFeature(fromAuthors.featureName, fromAuthors.reducer),
    EffectsModule.forFeature([
      AuthorsAlertEffects,
      AuthorsApiEffects,
      AuthorsDialogEffects,
    ]),
  ],
})
export class AuthorsStateModule {}
