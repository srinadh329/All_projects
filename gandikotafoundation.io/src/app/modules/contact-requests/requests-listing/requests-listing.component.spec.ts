import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsListingComponent } from './requests-listing.component';

describe('RequestsListingComponent', () => {
  let component: RequestsListingComponent;
  let fixture: ComponentFixture<RequestsListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestsListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestsListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
