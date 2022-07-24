import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgemployesComponent } from './orgemployes.component';

describe('OrgemployesComponent', () => {
  let component: OrgemployesComponent;
  let fixture: ComponentFixture<OrgemployesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgemployesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgemployesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
