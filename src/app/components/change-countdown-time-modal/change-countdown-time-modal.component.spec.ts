import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeCountdownTimeModalComponent } from './change-countdown-time-modal.component';

describe('ChangeCountdownTimeModalComponent', () => {
  let component: ChangeCountdownTimeModalComponent;
  let fixture: ComponentFixture<ChangeCountdownTimeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeCountdownTimeModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeCountdownTimeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
