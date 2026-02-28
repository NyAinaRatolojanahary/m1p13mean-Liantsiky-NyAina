import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopUserFormComponent } from './shop-user-form.component';

describe('ShopUserFormComponent', () => {
  let component: ShopUserFormComponent;
  let fixture: ComponentFixture<ShopUserFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopUserFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
