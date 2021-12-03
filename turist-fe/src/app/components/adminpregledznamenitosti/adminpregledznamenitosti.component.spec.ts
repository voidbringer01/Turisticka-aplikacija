import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminpregledznamenitostiComponent } from './adminpregledznamenitosti.component';

describe('AdminpregledznamenitostiComponent', () => {
  let component: AdminpregledznamenitostiComponent;
  let fixture: ComponentFixture<AdminpregledznamenitostiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminpregledznamenitostiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminpregledznamenitostiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
