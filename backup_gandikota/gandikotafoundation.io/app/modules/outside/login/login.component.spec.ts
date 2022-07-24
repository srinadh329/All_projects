import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { SharedModule } from '../../../shared/shared.module';
import { AuthService } from '../../../core/services/auth.service';
import { AngularFireModule } from "@angular/fire";
import { environment } from "src/environments/environment";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
fdescribe('Login component checking ', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [SharedModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        BrowserAnimationsModule
      ],
      providers: [AuthService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('form'));
    el = de.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  // check is_submit Variable
  it('should set  is_submit  to be true', () => {
    component.loginSubmit();
    expect(component.is_submit).toBeTruthy();
  });
  
    // check login method
    it('should call  loginSubmit method', () => {
      spyOn(component, 'loginSubmit')
      el = fixture.debugElement.query(By.css('button')).nativeElement;
      el.click()
      expect(component.loginSubmit).toHaveBeenCalledTimes(1);
      fixture.detectChanges();
    });



  // check form getting invalid or not
  it('form should be invalid  if empty values submitted', () => {
    component.loginForm.patchValue({
      email: '',
      password: ''
    })
    expect(component.loginForm.invalid).toBeTruthy();
  });

  // check form getting invalid  when invalid email given
  it('form should be invalid  if invalid email supplied', () => {
    component.loginForm.patchValue({
      email: 'test',
      password: ''
    })
    expect(component.loginForm.invalid).toBeTruthy();
  });

  // check form getting invalid password supplied
  it('form should be invalid  if invalid password supplied', () => {
    component.loginForm.patchValue({
      email: '',
      password: 'fsf'
    })
    expect(component.loginForm.invalid).toBeTruthy();
  });

  // check form getting invalid or not
  it('form should be invalid  if invalid password and email supplied', () => {
    component.loginForm.patchValue({
      email: 'ffsf',
      password: 'fsf'
    })
    expect(component.loginForm.invalid).toBeTruthy();
  });

  // check form should be valid 
  it('form should be valid ', () => {
    component.loginForm.patchValue({
      email: 'venkatesh@scube.me',
      password: 'admin123'
    })
    expect(component.loginForm.valid).toBeTruthy();
  });


});
