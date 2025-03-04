import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTvaComponent } from './add-tva.component';

describe('AddTvaComponent', () => {
  let component: AddTvaComponent;
  let fixture: ComponentFixture<AddTvaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddTvaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddTvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
