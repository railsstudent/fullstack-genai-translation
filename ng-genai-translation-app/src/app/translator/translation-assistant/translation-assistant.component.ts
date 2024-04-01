import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-translation-assistant',
  standalone: true,
  imports: [],
  template: `
    <p>
      translation-assistant works!
    </p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TranslationAssistantComponent {

}
