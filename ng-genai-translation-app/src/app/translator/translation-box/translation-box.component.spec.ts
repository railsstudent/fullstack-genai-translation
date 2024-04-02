import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslationAssistantComponent } from './translation-assistant.component';

describe('TranslationAssistantComponent', () => {
  let component: TranslationAssistantComponent;
  let fixture: ComponentFixture<TranslationAssistantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslationAssistantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TranslationAssistantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
