import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagemapComponent } from './messagemap.component';

describe('MessagemapComponent', () => {
  let component: MessagemapComponent;
  let fixture: ComponentFixture<MessagemapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessagemapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagemapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
