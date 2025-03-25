import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPaimentComponent } from './edit-paiment.component';

describe('EditPaimentComponent', () => {
  let component: EditPaimentComponent;
  let fixture: ComponentFixture<EditPaimentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditPaimentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditPaimentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
