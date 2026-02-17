import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoveProductsComponent } from './love-products.component';

describe('LoveProductsComponent', () => {
  let component: LoveProductsComponent;
  let fixture: ComponentFixture<LoveProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoveProductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoveProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
