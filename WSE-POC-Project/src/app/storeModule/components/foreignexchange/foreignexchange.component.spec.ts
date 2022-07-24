import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ForeignexchangeComponent } from './foreignexchange.component';

describe('ForeignexchangeComponent', () => {
  let component: ForeignexchangeComponent;
  let fixture: ComponentFixture<ForeignexchangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForeignexchangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForeignexchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
