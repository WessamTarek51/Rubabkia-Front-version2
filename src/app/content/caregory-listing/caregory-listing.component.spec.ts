import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaregoryListingComponent } from './caregory-listing.component';

describe('CaregoryListingComponent', () => {
  let component: CaregoryListingComponent;
  let fixture: ComponentFixture<CaregoryListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaregoryListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaregoryListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
