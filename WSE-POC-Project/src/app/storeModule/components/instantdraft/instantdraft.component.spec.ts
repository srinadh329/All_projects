import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstantdraftComponent } from './instantdraft.component';

describe('InstantdraftComponent', () => {
  let component: InstantdraftComponent;
  let fixture: ComponentFixture<InstantdraftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstantdraftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstantdraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
