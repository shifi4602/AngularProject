import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KnifesComponent } from './knifes.component';

describe('KnifesComponent', () => {
  let component: KnifesComponent;
  let fixture: ComponentFixture<KnifesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KnifesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KnifesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
