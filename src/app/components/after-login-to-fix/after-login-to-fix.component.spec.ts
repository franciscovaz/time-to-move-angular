import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfterLoginToFixComponent } from './after-login-to-fix.component';

describe('AfterLoginToFixComponent', () => {
  let component: AfterLoginToFixComponent;
  let fixture: ComponentFixture<AfterLoginToFixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfterLoginToFixComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfterLoginToFixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
