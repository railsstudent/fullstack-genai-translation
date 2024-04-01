import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslationListComponent } from './translation-list.component';

describe('TranslationListComponent', () => {
  let component: TranslationListComponent;
  let fixture: ComponentFixture<TranslationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslationListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TranslationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
