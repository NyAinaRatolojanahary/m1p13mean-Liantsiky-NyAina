import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtageListComponent } from './etage-list.component';

describe('EtageListComponent', () => {
  let component: EtageListComponent;
  let fixture: ComponentFixture<EtageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtageListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
