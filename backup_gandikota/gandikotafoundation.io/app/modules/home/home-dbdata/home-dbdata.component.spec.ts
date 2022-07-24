import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDbdataComponent } from './home-dbdata.component';

describe('HomeDbdataComponent', () => {
  let component: HomeDbdataComponent;
  let fixture: ComponentFixture<HomeDbdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeDbdataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeDbdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
