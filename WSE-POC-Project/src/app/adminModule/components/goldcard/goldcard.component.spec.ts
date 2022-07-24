import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoldcardComponent } from './goldcard.component';

describe('GoldcardComponent', () => {
  let component: GoldcardComponent;
  let fixture: ComponentFixture<GoldcardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoldcardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoldcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
