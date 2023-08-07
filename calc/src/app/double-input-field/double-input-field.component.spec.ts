import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoubleInputFieldComponent } from './double-input-field.component';

describe('DoubleInputFieldComponent', () => {
  let component: DoubleInputFieldComponent;
  let fixture: ComponentFixture<DoubleInputFieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoubleInputFieldComponent]
    });
    fixture = TestBed.createComponent(DoubleInputFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
