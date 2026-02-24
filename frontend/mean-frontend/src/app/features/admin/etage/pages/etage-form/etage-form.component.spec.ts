import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtageFormComponent } from './etage-form.component';

describe('EtageFormComponent', () => {
  let component: EtageFormComponent;
  let fixture: ComponentFixture<EtageFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtageFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
