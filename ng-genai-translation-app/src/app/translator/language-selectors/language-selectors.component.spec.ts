import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageSelectorsComponent } from './language-selectors.component';

describe('LanguageSelectorsComponent', () => {
  let component: LanguageSelectorsComponent;
  let fixture: ComponentFixture<LanguageSelectorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanguageSelectorsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LanguageSelectorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
