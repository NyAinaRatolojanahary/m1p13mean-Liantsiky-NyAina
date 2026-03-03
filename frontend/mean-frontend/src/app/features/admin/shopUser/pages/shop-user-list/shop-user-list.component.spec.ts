import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopUserListComponent } from './shop-user-list.component';

describe('ShopUserListComponent', () => {
  let component: ShopUserListComponent;
  let fixture: ComponentFixture<ShopUserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopUserListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
