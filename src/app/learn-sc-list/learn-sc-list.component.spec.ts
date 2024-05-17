import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnScListComponent } from './learn-sc-list.component';

describe('LearnScListComponent', () => {
  let component: LearnScListComponent;
  let fixture: ComponentFixture<LearnScListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearnScListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearnScListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
