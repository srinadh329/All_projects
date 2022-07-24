import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GallerydataComponent } from './gallerydata.component';

describe('GallerydataComponent', () => {
  let component: GallerydataComponent;
  let fixture: ComponentFixture<GallerydataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GallerydataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GallerydataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
