import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZnamenitostComponent } from './znamenitost.component';

describe('ZnamenitostComponent', () => {
  let component: ZnamenitostComponent;
  let fixture: ComponentFixture<ZnamenitostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZnamenitostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZnamenitostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
