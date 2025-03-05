import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditModeleComponent } from './edit-modele.component';

describe('EditModeleComponent', () => {
  let component: EditModeleComponent;
  let fixture: ComponentFixture<EditModeleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditModeleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditModeleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
