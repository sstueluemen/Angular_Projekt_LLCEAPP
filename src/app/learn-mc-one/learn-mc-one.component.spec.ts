import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnMcOneComponent } from './learn-mc-one.component';

describe('LearnMcOneComponent', () => {
  let component: LearnMcOneComponent;
  let fixture: ComponentFixture<LearnMcOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearnMcOneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearnMcOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
