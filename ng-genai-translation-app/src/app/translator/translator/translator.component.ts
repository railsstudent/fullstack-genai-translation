import { ChangeDetectionStrategy, Component, computed, inject, model } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { scan } from 'rxjs';
import { Translate } from '../interfaces/translate.interface';
import { TranslationResult } from '../interfaces/translation-result.interface';
import { LanguageSelectorsComponent } from '../language-selectors/language-selectors.component';
import { TranslatorService } from '../services/translator.service';
import { TranslationListComponent } from '../translation-list/translation-list.component';

@Component({
  selector: 'app-translator',
  standalone: true,
  imports: [FormsModule, LanguageSelectorsComponent, TranslationListComponent],
  template: `
    <div class="container">
      <h2>Ng Text Translation Demo</h2>
      <div class="translator">
        <app-language-selectors [languages]="languages" [(from)]="fromLanguage" [(to)]="toLanguage" />
        <textarea rows="10" [(ngModel)]="text"></textarea>
        <button (click)="translate()">Translate me!</button>
      </div>
      <app-translation-list [translationList]="translationList()" />
    </div>
  `,
  styles: `
    div.container {
      padding: 1rem;
    }

    div.translator {
      margin-top: 1rem;
    }

    textarea {
      width: 50%;
      margin-right: 0.25rem;
      padding: 0.5rem;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TranslatorComponent {
  text = model('');
  fromLanguage = model('en');
  toLanguage = model('en');

  translatorService = inject(TranslatorService);
  languages = this.translatorService.getSupportedLanguages();
  translationList = toSignal( 
    this.translatorService.translation$
      .pipe(scan((acc, translation) => ([translation, ...acc]), [] as TranslationResult[])), 
    {initialValue: [] as TranslationResult[] }
  );

  viewModel = computed<Translate>(() => {
    return {
      text: this.text(),
      from: this.fromLanguage(),
      to: this.toLanguage(),
      isValid: !!this.text() && !!this.fromLanguage() && !!this.toLanguage(), 
    }
  });

  translate() {
    this.translatorService.translateText(this.viewModel());
  }
}
