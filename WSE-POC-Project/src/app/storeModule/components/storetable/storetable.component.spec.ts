import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoretableComponent } from './storetable.component';

describe('StoretableComponent', () => {
  let component: StoretableComponent;
  let fixture: ComponentFixture<StoretableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoretableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoretableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
