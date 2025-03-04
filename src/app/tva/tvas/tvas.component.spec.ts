import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvasComponent } from './tvas.component';

describe('TvasComponent', () => {
  let component: TvasComponent;
  let fixture: ComponentFixture<TvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TvasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
