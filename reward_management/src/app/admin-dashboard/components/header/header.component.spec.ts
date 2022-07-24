import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderAdminComponent} from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderAdminComponent;
  let fixture: ComponentFixture<HeaderAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
