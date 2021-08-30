import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PwLibComponent } from './pw-lib.component';

describe('PwLibComponent', () => {
  let component: PwLibComponent;
  let fixture: ComponentFixture<PwLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PwLibComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PwLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
