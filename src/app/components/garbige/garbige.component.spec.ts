import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GarbigeComponent } from './garbige.component';

describe('GarbigeComponent', () => {
  let component: GarbigeComponent;
  let fixture: ComponentFixture<GarbigeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GarbigeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GarbigeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
