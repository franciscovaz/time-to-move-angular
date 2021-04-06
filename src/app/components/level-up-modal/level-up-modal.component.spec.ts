import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelUpModalComponent } from './level-up-modal.component';

describe('LevelUpModalComponent', () => {
  let component: LevelUpModalComponent;
  let fixture: ComponentFixture<LevelUpModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LevelUpModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelUpModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
