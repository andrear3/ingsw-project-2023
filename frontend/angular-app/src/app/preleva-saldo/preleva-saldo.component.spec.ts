import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrelevaSaldoComponent } from './preleva-saldo.component';

describe('PrelevaSaldoComponent', () => {
  let component: PrelevaSaldoComponent;
  let fixture: ComponentFixture<PrelevaSaldoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrelevaSaldoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrelevaSaldoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
