import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JetonListComponent } from './jeton-list.component';

describe('JetonListComponent', () => {
  let component: JetonListComponent;
  let fixture: ComponentFixture<JetonListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JetonListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JetonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
