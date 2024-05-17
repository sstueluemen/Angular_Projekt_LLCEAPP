import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamFiComponent } from './exam-fi.component';

describe('ExamFiComponent', () => {
  let component: ExamFiComponent;
  let fixture: ComponentFixture<ExamFiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamFiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamFiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
