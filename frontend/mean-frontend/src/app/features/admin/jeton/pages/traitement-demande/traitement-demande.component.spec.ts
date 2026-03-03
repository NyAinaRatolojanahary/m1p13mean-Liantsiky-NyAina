import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraitementDemandeComponent } from './traitement-demande.component';

describe('TraitementDemandeComponent', () => {
  let component: TraitementDemandeComponent;
  let fixture: ComponentFixture<TraitementDemandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TraitementDemandeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TraitementDemandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
