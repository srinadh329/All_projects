import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchusersComponent } from './branchusers.component';

describe('BranchusersComponent', () => {
  let component: BranchusersComponent;
  let fixture: ComponentFixture<BranchusersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchusersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
