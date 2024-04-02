import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TranslationResult } from '../interfaces/translation-result.interface';
import { LineBreakPipe } from '../pipes/line-break.pipe';

@Component({
  selector: 'app-translation-list',
  standalone: true,
  imports: [LineBreakPipe],
  template: `
    <h3>Translation Results: </h3>
    @if (translationList().length > 0) {
    <div class="list">
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
      }
    </div>
    } @else {
      <p>No translation</p>
    }
  `,
  styles: `
    h3 {
      font-size: 1.5rem;
      font-style: italic;
      text-decoration: underline;
    }

    p, span {
      display: inline-block;
    }

    div.list {
      border: 1px solid black;
      border-radius: 4px;
      padding: 1rem;
      width: 50%;
      height: 300px;
      overflow-y: scroll;
    }

    div.list > div {
      display: flex;
    }

    span {
      width: 20%;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TranslationListComponent {
  translationList = input.required<TranslationResult[]>();
}
