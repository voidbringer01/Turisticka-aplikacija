import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarsVoteComponent } from './stars-vote.component';

describe('StarsVoteComponent', () => {
  let component: StarsVoteComponent;
  let fixture: ComponentFixture<StarsVoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StarsVoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StarsVoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
