import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteModeleComponent } from './delete-modele.component';

describe('DeleteModeleComponent', () => {
  let component: DeleteModeleComponent;
  let fixture: ComponentFixture<DeleteModeleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteModeleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteModeleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
