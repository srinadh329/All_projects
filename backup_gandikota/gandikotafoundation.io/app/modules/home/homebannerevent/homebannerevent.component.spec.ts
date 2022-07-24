import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomebannereventComponent } from './homebannerevent.component';

describe('HomebannereventComponent', () => {
  let component: HomebannereventComponent;
  let fixture: ComponentFixture<HomebannereventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomebannereventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomebannereventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
