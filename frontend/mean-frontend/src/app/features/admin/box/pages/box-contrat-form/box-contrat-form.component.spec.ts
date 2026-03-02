import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxContratFormComponent } from './box-contrat-form.component';

describe('BoxContratFormComponent', () => {
  let component: BoxContratFormComponent;
  let fixture: ComponentFixture<BoxContratFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoxContratFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoxContratFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
