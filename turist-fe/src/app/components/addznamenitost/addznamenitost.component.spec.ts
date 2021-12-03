import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddznamenitostComponent } from './addznamenitost.component';

describe('AddznamenitostComponent', () => {
  let component: AddznamenitostComponent;
  let fixture: ComponentFixture<AddznamenitostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddznamenitostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddznamenitostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
