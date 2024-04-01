import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TranslationResult } from '../interfaces/translation-result.interface';
import { LineBreakPipe } from '../pipes/line-break.pipe';

@Component({
  selector: 'app-translation-list',
  standalone: true,
  imports: [LineBreakPipe],
  template: `
    <div>
      <h3>Translation Results: </h3>
      @for (item of translationList(); track item) {
        <div>
          <span>Source: </span>
          <p [innerHTML]="item.source | lineBreak"></p>
        </div>
        <div>
          <span>Result: </span>
          <p [innerHTML]="item.result | lineBreak"></p>
        </div>
        <hr />
      } @empty {
        <p>No translation</p>
      }
    </div>
  `,
  styles: `
    h3 {
      font-size: 1.5rem;
      font-style: italic;
      text-decoration: underline;
    }

    p {
      display: inline-block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TranslationListComponent {
  translationList = input.required<TranslationResult[]>();
}
