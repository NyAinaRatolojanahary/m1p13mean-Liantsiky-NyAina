import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JetonFormComponent } from './jeton-form.component';

describe('JetonFormComponent', () => {
  let component: JetonFormComponent;
  let fixture: ComponentFixture<JetonFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JetonFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JetonFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
