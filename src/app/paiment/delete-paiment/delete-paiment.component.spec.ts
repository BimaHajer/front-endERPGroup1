import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePaimentComponent } from './delete-paiment.component';

describe('DeletePaimentComponent', () => {
  let component: DeletePaimentComponent;
  let fixture: ComponentFixture<DeletePaimentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeletePaimentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeletePaimentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
