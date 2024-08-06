import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AstaClassicaComponent } from './asta-classica.component';

describe('AstaClassicaComponent', () => {
  let component: AstaClassicaComponent;
  let fixture: ComponentFixture<AstaClassicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AstaClassicaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AstaClassicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
