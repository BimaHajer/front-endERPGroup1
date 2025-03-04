import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTvaComponent } from './detail-tva.component';

describe('DetailTvaComponent', () => {
  let component: DetailTvaComponent;
  let fixture: ComponentFixture<DetailTvaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailTvaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailTvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
