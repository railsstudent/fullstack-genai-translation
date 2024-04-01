import { ChangeDetectionStrategy, Component, computed, inject, model } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { Translate } from '../interfaces/translate.interface';
import { LanguageSelectorsComponent } from '../language-selectors/language-selectors.component';
import { LineBreakPipe } from '../pipes/line-break.pipe';
import { TranslatorService } from '../services/translator.service';

@Component({
  selector: 'app-translator',
  standalone: true,
  imports: [FormsModule, LineBreakPipe, LanguageSelectorsComponent],
  template: `
    <div class="container">
      <h2>Ng Text Translation Demo</h2>
      <div class="translator">
        <app-language-selectors [languages]="languages" [(from)]="fromLanguage" [(to)]="toLanguage" />
        <textarea rows="10" [(ngModel)]="text"></textarea>
        <button (click)="translate()">Translate me!</button>
      </div>
      <div>
        <p>Translated Result: </p>
        @if (translatedText(); as translatedText) {
          <p [innerHTML]="text() | lineBreak"></p>
          <p [innerHTML]="translatedText | lineBreak"></p>
        }
      </div>
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
  translatedText = toSignal(this.translatorService.translation$);

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
