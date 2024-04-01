import { CommonModule } from '@angular/common';
import { assertInInjectionContext, ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslatorComponent } from './translator/translator/translator.component';
import { Title } from '@angular/platform-browser';

function updateDocTitle(title: string) {
  assertInInjectionContext(updateDocTitle);
  const titleInjector = inject(Title);
  titleInjector.setTitle(title);
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TranslatorComponent],
  template: `
    <app-translator />
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor() {
    updateDocTitle('Ng Text Translator Demo');
  }
}
