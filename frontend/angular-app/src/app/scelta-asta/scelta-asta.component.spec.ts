import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SceltaAstaComponent } from './scelta-asta.component';

describe('SceltaAstaComponent', () => {
  let component: SceltaAstaComponent;
  let fixture: ComponentFixture<SceltaAstaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SceltaAstaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SceltaAstaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
