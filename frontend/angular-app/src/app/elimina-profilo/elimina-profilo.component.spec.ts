import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminaProfiloComponent } from './elimina-profilo.component';

describe('EliminaProfiloComponent', () => {
  let component: EliminaProfiloComponent;
  let fixture: ComponentFixture<EliminaProfiloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EliminaProfiloComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminaProfiloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
