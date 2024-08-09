import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AstaComponent } from './asta.component';

describe('AstaComponent', () => {
  let component: AstaComponent;
  let fixture: ComponentFixture<AstaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AstaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AstaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
