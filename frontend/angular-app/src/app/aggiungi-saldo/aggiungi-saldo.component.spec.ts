import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggiungiSaldoComponent } from './aggiungi-saldo.component';

describe('AggiungiSaldoComponent', () => {
  let component: AggiungiSaldoComponent;
  let fixture: ComponentFixture<AggiungiSaldoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AggiungiSaldoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AggiungiSaldoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
