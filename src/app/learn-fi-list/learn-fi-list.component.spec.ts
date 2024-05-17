import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnFiListComponent } from './learn-fi-list.component';

describe('LearnFiListComponent', () => {
  let component: LearnFiListComponent;
  let fixture: ComponentFixture<LearnFiListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearnFiListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearnFiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
