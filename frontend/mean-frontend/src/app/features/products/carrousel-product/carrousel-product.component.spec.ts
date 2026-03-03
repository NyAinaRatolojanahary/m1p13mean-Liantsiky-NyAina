import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrouselProductComponent } from './carrousel-product.component';

describe('CarrouselProductComponent', () => {
  let component: CarrouselProductComponent;
  let fixture: ComponentFixture<CarrouselProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarrouselProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarrouselProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
