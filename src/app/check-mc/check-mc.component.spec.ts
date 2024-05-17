import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckMcComponent } from './check-mc.component';

describe('CheckMcComponent', () => {
  let component: CheckMcComponent;
  let fixture: ComponentFixture<CheckMcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckMcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckMcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
