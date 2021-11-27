import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZnamenitostpreviewComponent } from './znamenitostpreview.component';

describe('ZnamenitostpreviewComponent', () => {
  let component: ZnamenitostpreviewComponent;
  let fixture: ComponentFixture<ZnamenitostpreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZnamenitostpreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZnamenitostpreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
