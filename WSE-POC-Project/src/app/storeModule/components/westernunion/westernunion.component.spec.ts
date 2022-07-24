import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WesternunionComponent } from './westernunion.component';

describe('WesternunionComponent', () => {
  let component: WesternunionComponent;
  let fixture: ComponentFixture<WesternunionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WesternunionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WesternunionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
