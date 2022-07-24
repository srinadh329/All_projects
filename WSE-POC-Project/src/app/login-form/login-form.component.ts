import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AdminService } from '../adminModule/admin.service';
import { AppService } from '../app.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})

export class LoginFormComponent implements OnInit {
  loginForm: any;
  currentuser: any;
   hide:boolean=true;
  constructor(private appservice: AppService, private formBuilder: FormBuilder,
    private AdAdminService: AdminService, public toaster: ToastrManager) { }

  ngOnInit() {
    this.appservice.userNavigate();
    this.loginForm = this.formBuilder.group({
        usrid: ['', Validators.required],
        password: ['', Validators.required]
      });
  }

  @HostListener('paste', ['$event']) blockPaste(e: KeyboardEvent) {
    e.preventDefault();
  }

  @HostListener('copy', ['$event']) blockCopy(e: KeyboardEvent) {
    e.preventDefault();
  }

  @HostListener('cut', ['$event']) blockCut(e: KeyboardEvent) {
    e.preventDefault();
  }



  login() {
    if (this.loginForm.valid) {
      this.AdAdminService.userLogin(this.loginForm.value).subscribe((data: any) => {
        this.currentuser = data;
        if (data.token) {
          this.toaster.successToastr("Login Successfully!", '', { position: 'bottom-center',maxShown:1  })
          this.appservice.setLocalStoarge('auth.user', JSON.stringify(data.token));
          this.appservice.setLocalStoarge('user', JSON.stringify(data.user));
          this.appservice.userNavigate()
        }
        else {
          this.toaster.errorToastr(data.message, '', { position: 'bottom-center', maxShown:1  })
        }
      })
    }
  }
}