import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslationBoxModel } from '../interfaces/translate.interface';

@Component({
  selector: 'app-translation-box',
  standalone: true,
  imports: [FormsModule],
  template: `
    <textarea rows="10" [(ngModel)]="text"></textarea>
    <button (click)="handleClicked()" [disabled]="vm.isLoading">{{ vm.buttonText }}</button>
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
export class TranslationBoxComponent {
  text = signal('');
  isLoading = input(false);

  viewModel = computed<TranslationBoxModel>(() => {
    return {
      text: this.text(),
      isLoading: this.isLoading(),
      buttonText: this.isLoading() ? 'Translating...' : 'Translate me!',
    }
  });

  translate = output<string>();

  get vm() {
    return this.viewModel();
  }

  handleClicked() {
    this.translate.emit(this.text());
  }
}
