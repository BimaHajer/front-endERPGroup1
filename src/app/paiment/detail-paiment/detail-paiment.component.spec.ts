import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPaimentComponent } from './detail-paiment.component';

describe('DetailPaimentComponent', () => {
  let component: DetailPaimentComponent;
  let fixture: ComponentFixture<DetailPaimentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailPaimentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailPaimentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
