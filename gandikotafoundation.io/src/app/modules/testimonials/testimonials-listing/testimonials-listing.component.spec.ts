import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonialsListingComponent } from './testimonials-listing.component';

describe('TestimonialsListingComponent', () => {
  let component: TestimonialsListingComponent;
  let fixture: ComponentFixture<TestimonialsListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestimonialsListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestimonialsListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
