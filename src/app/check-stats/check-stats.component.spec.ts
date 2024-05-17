import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckStatsComponent } from './check-stats.component';

describe('CheckStatsComponent', () => {
  let component: CheckStatsComponent;
  let fixture: ComponentFixture<CheckStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckStatsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
