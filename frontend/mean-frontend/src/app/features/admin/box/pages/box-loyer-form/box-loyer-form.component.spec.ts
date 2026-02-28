import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxLoyerFormComponent } from './box-loyer-form.component';

describe('BoxLoyerFormComponent', () => {
  let component: BoxLoyerFormComponent;
  let fixture: ComponentFixture<BoxLoyerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoxLoyerFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoxLoyerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
