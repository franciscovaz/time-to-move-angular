import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CintentEditableComponent } from './cintent-editable.component';

describe('CintentEditableComponent', () => {
  let component: CintentEditableComponent;
  let fixture: ComponentFixture<CintentEditableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CintentEditableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CintentEditableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
