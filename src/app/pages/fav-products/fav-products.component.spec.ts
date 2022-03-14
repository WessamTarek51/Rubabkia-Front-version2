import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavProductsComponent } from './fav-products.component';

describe('FavProductsComponent', () => {
  let component: FavProductsComponent;
  let fixture: ComponentFixture<FavProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
