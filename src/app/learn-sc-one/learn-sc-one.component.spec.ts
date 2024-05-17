import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnScOneComponent } from './learn-sc-one.component';

describe('LearnScOneComponent', () => {
  let component: LearnScOneComponent;
  let fixture: ComponentFixture<LearnScOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearnScOneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearnScOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
