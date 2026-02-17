import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyingPageComponent } from './buying-page.component';

describe('BuyingPageComponent', () => {
  let component: BuyingPageComponent;
  let fixture: ComponentFixture<BuyingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyingPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
