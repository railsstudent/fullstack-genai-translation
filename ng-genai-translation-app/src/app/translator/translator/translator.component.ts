import { ChangeDetectionStrategy, Component, computed, inject, model, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { scan, tap } from 'rxjs';
import { TranslationModel } from '../interfaces/translate.interface';
import { TranslationResult } from '../interfaces/translation-result.interface';
import { LanguageSelectorsComponent } from '../language-selectors/language-selectors.component';
import { TranslatorService } from '../services/translator.service';
import { TranslationAssistantComponent } from '../translation-assistant/translation-assistant.component';
import { TranslationListComponent } from '../translation-list/translation-list.component';

@Component({
  selector: 'app-translator',
  standalone: true,
  imports: [FormsModule, LanguageSelectorsComponent, TranslationListComponent, TranslationAssistantComponent],
  template: `
    <div class="container">
      <h2>Ng Text Translation Demo</h2>
      <div class="translator">
        <app-language-selectors [languages]="languages" [(from)]="fromLanguage" [(to)]="toLanguage" />
        <app-translation-assistant />
        <!-- <textarea rows="10" [(ngModel)]="text"></textarea>
        <button (click)="translate()" [disabled]="vm.isLoading">{{ vm.buttonText }}</button> -->
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

    // textarea {
    //   width: 50%;
    //   margin-right: 0.25rem;
    //   padding: 0.5rem;
    // }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TranslatorComponent {
  text = model('');
  fromLanguage = model('en');
  toLanguage = model('en');
  isLoading = signal(false);

  translatorService = inject(TranslatorService);
  languages = this.translatorService.getSupportedLanguages();
  translationList = toSignal( 
    this.translatorService.translation$
      .pipe(
        scan((acc, translation) => ([translation, ...acc]), [] as TranslationResult[]),
        tap(() => this.isLoading.set(false)),
      ), 
    { initialValue: [] as TranslationResult[] }
  );

  viewModel = computed<TranslationModel>(() => {
    return {
      text: this.text(),
      from: this.fromLanguage(),
      to: this.toLanguage(),
      isValid: !!this.text() && !!this.fromLanguage() && !!this.toLanguage(), 
      isLoading: this.isLoading(),
      buttonText: this.isLoading() ? 'Translating...' : 'Translate me!',
    }
  });

  get vm() {
    return this.viewModel();
  }

  translate() {
    this.isLoading.set(true);
    this.translatorService.translateText(this.vm);
  }
}
