import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganzationsettingsComponent } from './organzationsettings.component';

describe('OrganzationsettingsComponent', () => {
  let component: OrganzationsettingsComponent;
  let fixture: ComponentFixture<OrganzationsettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganzationsettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganzationsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
