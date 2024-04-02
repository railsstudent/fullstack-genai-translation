import { ChangeDetectionStrategy, Component, computed, effect, inject, signal, viewChild } from '@angular/core';
import { outputToObservable, toSignal } from '@angular/core/rxjs-interop';
import { scan, tap } from 'rxjs';
import { TranslationModel } from '../interfaces/translate.interface';
import { TranslationResult } from '../interfaces/translation-result.interface';
import { LanguageSelectorsComponent } from '../language-selectors/language-selectors.component';
import { TranslatorService } from '../services/translator.service';
import { TranslationBoxComponent } from '../translation-box/translation-box.component';
import { TranslationListComponent } from '../translation-list/translation-list.component';

@Component({
  selector: 'app-translator',
  standalone: true,
  imports: [LanguageSelectorsComponent, TranslationListComponent, TranslationBoxComponent],
  template: `
    <div class="container">
      <h2>Ng Text Translation Demo</h2>
      <div class="translator">
        <app-language-selectors [languages]="languages" [(from)]="fromLanguage" [(to)]="toLanguage" />
        <app-translation-box #box [isLoading]="vm.isLoading" />
      </div>
      <app-translation-list [translationList]="vm.translationList" />
    </div>
  `,
  styles: `
    div.container {
      padding: 1rem;
    }

    div.translator {
      margin-top: 1rem;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TranslatorComponent {
  fromLanguage = signal('en');
  toLanguage = signal('en');
  isLoading = signal(false);
  box = viewChild.required(TranslationBoxComponent);

  translatorService = inject(TranslatorService);
  languages = this.translatorService.getSupportedLanguages();
  translationList = toSignal( 
    this.translatorService.translation$
      .pipe(
        scan((acc, translation) => ([...acc, translation]), [] as TranslationResult[]),
        tap(() => this.isLoading.set(false)),
      ), 
    { initialValue: [] as TranslationResult[] }
  );

  viewModel = computed<TranslationModel>(() => {
    return {
      from: this.fromLanguage(),
      to: this.toLanguage(),
      isLoading: this.isLoading(),
      translationList: this.translationList(),
    }
  });

  get vm() {
    return this.viewModel();
  }

  constructor() {
    effect((cleanUp) => {
      const sub = outputToObservable(this.box().translate)
        .subscribe((text) => {
          this.isLoading.set(true);
          this.translatorService.translateText({
            text,
            from: this.vm.from,
            to: this.vm.to,
            isValid: !!text && !!this.vm.from && !!this.vm.to
          });
        });

      cleanUp(() => sub.unsubscribe());
    });
  }
}
