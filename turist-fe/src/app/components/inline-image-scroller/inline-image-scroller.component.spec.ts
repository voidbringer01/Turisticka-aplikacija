import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InlineImageScrollerComponent } from './inline-image-scroller.component';

describe('InlineImageScrollerComponent', () => {
  let component: InlineImageScrollerComponent;
  let fixture: ComponentFixture<InlineImageScrollerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InlineImageScrollerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InlineImageScrollerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
