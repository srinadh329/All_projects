import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationdataComponent } from './educationdata.component';

describe('EducationdataComponent', () => {
  let component: EducationdataComponent;
  let fixture: ComponentFixture<EducationdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EducationdataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
