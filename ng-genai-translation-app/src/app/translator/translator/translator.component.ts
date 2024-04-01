import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslatorService } from '../services/translator.service';

@Component({
  selector: 'app-translator',
  standalone: true,
  imports: [JsonPipe, FormsModule],
  template: `
    <div class="container">
      <h2>Ng Text Translation Demo</h2>
      <div class="translator">
        <div class="language-selectors">
          <label for="from">
            <span>From: </span>
            <select [(ngModel)]="fromLanguage">
              @for (language of languages; track language.code) {
                <option value="{{ language.code }}">{{ language.name }}</option>
              }
            </select>
          </label>
          <label for="to">
            <span>To: </span>
            <select [(ngModel)]="toLanguage">
              @for (language of languages; track language.code) {
                <option value="{{ language.code }}">{{ language.name }}</option>
              }
            </select>
          </label>
        </div>
        <textarea rows="10" [(ngModel)]="text"></textarea>
        <button (click)="translate()">Translate me!</button>
        <pre>
          {{ vm | json }}
        </pre>
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

    .language-selectors {
      width: 50%;
      display: flex;
      justify-content: space-around;
      margin-bottom: 0.75rem;
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

  viewModel = computed(() => {
    return {
      text: this.text(),
      from: this.fromLanguage(),
      to: this.toLanguage(),
    }
  });

  get vm() {
    return this.viewModel();
  }

  // btnTranslator = viewChild.required('btn', { read: HTMLButtonElement });

  // constructor() {
  //   this.btnTranslator().c
  // }

  translate() {

  }
}
