import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnFiOneComponent } from './learn-fi-one.component';

describe('LearnFiOneComponent', () => {
  let component: LearnFiOneComponent;
  let fixture: ComponentFixture<LearnFiOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearnFiOneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearnFiOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
