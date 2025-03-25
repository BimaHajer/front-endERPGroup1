import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPaimentComponent } from './add-paiment.component';

describe('AddPaimentComponent', () => {
  let component: AddPaimentComponent;
  let fixture: ComponentFixture<AddPaimentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddPaimentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddPaimentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
