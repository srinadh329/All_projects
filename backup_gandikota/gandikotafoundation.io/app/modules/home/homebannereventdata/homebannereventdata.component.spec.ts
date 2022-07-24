import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomebannereventdataComponent } from './homebannereventdata.component';

describe('HomebannereventdataComponent', () => {
  let component: HomebannereventdataComponent;
  let fixture: ComponentFixture<HomebannereventdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomebannereventdataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomebannereventdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
