import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeListComponent } from './mode-list.component';

describe('ModeListComponent', () => {
  let component: ModeListComponent;
  let fixture: ComponentFixture<ModeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModeListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
