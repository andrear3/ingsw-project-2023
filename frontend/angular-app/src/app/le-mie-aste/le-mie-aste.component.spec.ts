import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeMieAsteComponent } from './le-mie-aste.component';

describe('LeMieAsteComponent', () => {
  let component: LeMieAsteComponent;
  let fixture: ComponentFixture<LeMieAsteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeMieAsteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeMieAsteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
