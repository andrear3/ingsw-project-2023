import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisulizzaProfiloComponent } from './visulizza-profilo.component';

describe('VisulizzaProfiloComponent', () => {
  let component: VisulizzaProfiloComponent;
  let fixture: ComponentFixture<VisulizzaProfiloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisulizzaProfiloComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisulizzaProfiloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
