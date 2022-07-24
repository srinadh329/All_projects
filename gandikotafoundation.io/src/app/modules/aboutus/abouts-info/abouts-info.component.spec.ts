import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutsInfoComponent } from './abouts-info.component';

describe('AboutsInfoComponent', () => {
  let component: AboutsInfoComponent;
  let fixture: ComponentFixture<AboutsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutsInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
