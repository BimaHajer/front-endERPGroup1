import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderssComponent } from './providerss.component';

describe('ProviderssComponent', () => {
  let component: ProviderssComponent;
  let fixture: ComponentFixture<ProviderssComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProviderssComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProviderssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
