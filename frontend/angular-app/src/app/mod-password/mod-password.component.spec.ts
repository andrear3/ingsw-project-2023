import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModPasswordComponent } from './mod-password.component';

describe('ModPasswordComponent', () => {
  let component: ModPasswordComponent;
  let fixture: ComponentFixture<ModPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModPasswordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
