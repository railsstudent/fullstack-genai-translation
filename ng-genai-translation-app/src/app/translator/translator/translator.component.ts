import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-translator',
  standalone: true,
  imports: [JsonPipe, FormsModule],
  template: `
    <div class="container">
      <h2>Ng Text Translation Demo</h2>
      <div class="translator">
        <textarea rows="10" [(ngModel)]="text"></textarea>
        <pre>
          {{ text() | json }}
        </pre>
      </div>
    </div>
  `,
  styles: `
    div.container {
      padding: 1rem;
    }

    h2 {
      padding: 0.75rem;
      background: yellow;
      color: black;
    }

    div.translator {
      margin-top: 1rem;
    }

    textarea {
      width: 50%;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TranslatorComponent {
  text = model('');
}
