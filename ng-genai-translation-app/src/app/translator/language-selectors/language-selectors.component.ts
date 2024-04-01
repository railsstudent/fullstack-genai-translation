import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-language-selectors',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="language-selectors">
      <label for="from">
        <span>From: </span>
        <select [(ngModel)]="from">
          @for (language of languages(); track language.code) {
            <option value="{{ language.code }}">{{ language.name }}</option>
          }
        </select>
      </label>
      <label for="to">
        <span>To: </span>
        <select [(ngModel)]="to">
          @for (language of languages(); track language.code) {
            <option value="{{ language.code }}">{{ language.name }}</option>
          }
        </select>
      </label>
    </div>
  `,
  styles: `
    .language-selectors {
      width: 50%;
      display: flex;
      justify-content: space-around;
      margin-bottom: 0.75rem;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LanguageSelectorsComponent {
  languages = input.required<{ code: string; name: string }[]>();
  from = model('en');
  to = model('en');
}
