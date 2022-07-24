import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TelegraphtransferComponent } from './telegraphtransfer.component';

describe('TelegraphtransferComponent', () => {
  let component: TelegraphtransferComponent;
  let fixture: ComponentFixture<TelegraphtransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelegraphtransferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelegraphtransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
