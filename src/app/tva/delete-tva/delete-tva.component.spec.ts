import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTvaComponent } from './delete-tva.component';

describe('DeleteTvaComponent', () => {
  let component: DeleteTvaComponent;
  let fixture: ComponentFixture<DeleteTvaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteTvaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteTvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
