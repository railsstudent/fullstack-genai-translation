import { ChangeDetectionStrategy, Component, model, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-translation-assistant',
  standalone: true,
  imports: [FormsModule],
  template: `
    <textarea rows="10" [(ngModel)]="text"></textarea>
    <button (click)="translate()" [disabled]="vm.isLoading">{{ vm.buttonText }}</button>
  `,
  styles: `
    textarea {
      width: 50%;
      margin-right: 0.25rem;
      padding: 0.5rem;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TranslationAssistantComponent {
  text = model('');

  translateOutput = output<string>();

  translate() {
    this.translateOutput.emit(this.text());
  }
}
