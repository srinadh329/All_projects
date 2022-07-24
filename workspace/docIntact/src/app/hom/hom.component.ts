import { Component, OnInit, HostListener, ViewChild, ElementRef, ɵConsole ,NgZone} from '@angular/core';
import { GeneralService } from '../general.service';
import { Router } from "@angular/router";
import { UserService } from '../user.service';
import { AdminService } from '../admin.service';
import { MatDialog, } from '@angular/material';
import { DocumentService } from '../document.service';
import { ActivatedRoute,Params } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material';
import { FormControl } from '@angular/forms';
import { TooltipPosition } from '@angular/material';
import { CommonDialogComponent } from '../common-dialog/common-dialog.component';
import { HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { first } from 'rxjs/operators';
declare global {
  interface Window {
    RTCPeerConnection: RTCPeerConnection;
    mozRTCPeerConnection: RTCPeerConnection;
    webkitRTCPeerConnection: RTCPeerConnection;
  }
}
declare var $: any;
@Component({
  selector: 'app-hom',
  templateUrl: './hom.component.html',
  styleUrls: ['./hom.component.css']
})
export class HomComponent implements OnInit {
  [x: string]: any;
 

  constructor(private zone: NgZone,private snackBar: MatSnackBar, private cookieService: CookieService, public activatedroute: ActivatedRoute, public generalservice: GeneralService, private router: Router, public userService: UserService, public adminservice: AdminService, public dialog: MatDialog, public documentservice: DocumentService, private http: HttpClient, private _eref: ElementRef) {
    // this.provider.addScope('profile');

  }
  @ViewChild('buttonMobileMenu') buttonMobileMenu :ElementRef<any>;
  capsOn;
  positionOptions: TooltipPosition[] = ['right'];
  position = new FormControl(this.positionOptions[0]);
  myOptions = {
    'placement': 'left',
    'show-delay': 500
  }
  emailvalid: boolean
  login = true;
  register = false;
  reset = false;
  reset1 = true;
  hide = true;
  hide1 = true;
  email;
  check: boolean = false;
  individualclick: boolean
  organisationclick: boolean
  check1 :boolean= false;
  check2 = false;
  check3 = false;
  check4 = false;
  req1 = false;
  individual: boolean = false;
  iserror: boolean = false;
  otpTextBox: Boolean = false;
  errorres: any;
  emailchecked = false;
  userdata: any;
  changepassword: Boolean = false;
  useremail: any;
  id: any;
  show1: any = false;
  userForm: any
  Remember: boolean = false;
  username
  name
  companyname
  password
  passwordMinLength: Boolean;
  passwordupper: Boolean;
  passwordLower: Boolean;
  passwordNumber: Boolean;
  passwordSpecial: Boolean;
  upadtepassword: boolean
  upadtepassword1: boolean = true;
  usernameLength = false;
  formCheck
  displayerror
  maxTime: any = 120;
  time: any = 0;
  timer;
  showtime
  organisation: boolean = false
  hidedata: boolean = true
  type: any
  organisation_formSubmitted: boolean
  formSubmitted: boolean = false
  capslockOn
  key
  cookiename
  cookievalues = []
  emailcheck: boolean = false
  orgemailcheck: boolean = false
  emailForSignup
  services
  testimonials
  loadergif:boolean=false;
  loadergif2:boolean=false
  decryptedData:any
  routername:String
  message1:any
  private ipRegex = new RegExp(/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/);
  localIp
  IpAddress
routername1
iebrowser
emailinvalid //  for IE email validation in login
passwoedinvalid // for IE password validation in login
usernameinvalid // for IE username validation in login
fileid
isEmailLoaded=false; // For email checking, i.e email is getting from the DB
invalidmobile
focusin
ip
mobileMenuShow =true;

ngOnInit() {



  if(window.innerWidth < 1000) {
    this.mobileMenuShow = false;
  } 
    this.IpAddress= JSON.parse(localStorage.getItem('mylocation'));
     this.ip=JSON.parse(localStorage.getItem('myip')); 

    //detect IE browser 
if((!!(window as any).MSInputMethodContext && !!(document as any).documentMode))
{
  this.iebrowser=true
}
else 
{
  this.iebrowser=false

} 
    
    this.activatedroute.queryParams.subscribe((queryParams: Params) => {

      this.routername1=queryParams.type
      if( (/Edge\/\d./i.test(navigator.userAgent) || (!!(window as any).MSInputMethodContext && !!(document as any).documentMode)) && this.routername1=='undefined' && this.routername=='')
      {
        this.router.navigate(["/"])
        document.getElementById("loginclose").click();
      }
     else  if((/Edge\/\d./i.test(navigator.userAgent) || (!!(window as any).MSInputMethodContext && !!(document as any).documentMode)) && this.routername1=="Signup")
      {    this.hidedata = true
        this.checkorg=false
        document.getElementById("test1").click();
        // document.getElementById("loginclose").click();
      }
      else if( (/Edge\/\d./i.test(navigator.userAgent) || (!!(window as any).MSInputMethodContext && !!(document as any).documentMode)) && this.routername=="individualsignup")
      
      {   
        this.type = 'individual';
        this.individualclick = true
        this.organisationclick = false;
        this.hidedata = false
        this.individual=true
        this.checkorg=false
        document.getElementById("test1").click();
        setTimeout(() => {
          $("#target").focus();
        }, 1000);
        // document.getElementById("loginclose").click();
      }
      else if( (/Edge\/\d./i.test(navigator.userAgent) || (!!(window as any).MSInputMethodContext && !!(document as any).documentMode)) && this.routername=="individuallogin")
      {   
        document.getElementById("loginModalBtn").click();
        setTimeout(() => {
          $("#target").focus();
        }, 1000);
        // document.getElementById("loginclose").click();
        this.fileid=queryParams.fileid
      }
    });
    this.determineLocalIp();
    this.activatedroute.queryParams.subscribe(params => {
      this.routername = params["type"];
      if( this.routername=='undefined' && this.routername=='')
      {
        this.router.navigate(["/"])
        document.getElementById("loginclose").click();
      }
     else  if(this.routername=="Signup")
      {    this.hidedata = true
        this.checkorg=false
        document.getElementById("test1").click();
        // document.getElementById("loginclose").click();
      }
      else if(this.routername=="individualsignup")
      
      {   
        this.type = 'individual';
        this.individualclick = true
        this.organisationclick = false;
        this.hidedata = false
        this.individual=true
        this.checkorg=false
        document.getElementById("test1").click();
        setTimeout(() => {
          $("#target").focus();
        }, 1000);
        // document.getElementById("loginclose").click();
      }
      else if(this.routername=="individuallogin")
      {   
        document.getElementById("loginModalBtn").click();
        setTimeout(() => {
          $("#target").focus();
        }, 1000);
        // document.getElementById("loginclose").click();
        this.fileid=params.fileid
      }

    
  });
    var cookieExists = this.cookieService.check('token');
    if (cookieExists) { this.router.navigate(['/home/myfiles/']); }
 
    var token = this.activatedroute.snapshot.queryParams.token;
    var title = this.activatedroute.snapshot.queryParams.title
    var userData = {
      name: this.activatedroute.snapshot.queryParams.name,
      email: this.activatedroute.snapshot.queryParams.email,
      new: this.activatedroute.snapshot.queryParams.new,
      role: this.activatedroute.snapshot.queryParams.role,
      type: this.activatedroute.snapshot.queryParams.type,
      provider: this.activatedroute.snapshot.queryParams.provider,
      twitter_id: this.activatedroute.snapshot.queryParams.twitter_id || null,
      facebook_id: this.activatedroute.snapshot.queryParams.facebook_id || null,
    }
    if (title == "googlelogin") {
      this.userService.userdecryptData(userData).subscribe((data: any) => {
        this.decryptedData = data
        data.token = token
        data.user = data
        if(data.provider=="facebook"){
          if(data.email=="individual" || data.email==""){
            this.isDelete = true;
            document.getElementById('fbemailmobileBtn').click();
          }
          else {
            this.userService.setUserLoggedIn(data);
            if (data.role == 'user') this.router.navigate(['/home/myfiles/'])
          }
        }
        else if(data.provider=="twitter"){
          if(data.email=="individual" || data.email==""){
            this.isDelete = true;
            document.getElementById('emailmobileBtn').click();
          }
          else {
            this.userService.setUserLoggedIn(data);
            if (data.role == 'user') this.router.navigate(['/home/myfiles/'])
          }
        }
        else {
          this.userService.setUserLoggedIn(data);
          if (data.role == 'user') this.router.navigate(['/home/myfiles/'])
        } 
      })
    }
    var data: any = localStorage.getItem('currentUser');
    if(data){
      data=null;
      // this.userService.logout(); 
    }
    // this.validate(this.password)

  $(window).resize(function(){
    
    if($(window).width()<1000){
       }
       else{
      
       }
  });
    $(document).ready(function () {
      $('.owl-carousel').owlCarousel({
        stagePadding: 200,
        loop: true,
        dots: true,
        margin: 10,
        nav: false,
        items: 1,
        lazyLoad: true,
        // nav: false,
        autoplay: false,
        responsive: {

          320: {
            items: 1,
            stagePadding: 30
          },
          // 0: {
          //     items: 1,
          //     stagePadding: 60
          // },
          360: {
            items: 1,
            stagePadding: 30
          },
          600: {
            items: 1,
            stagePadding: 100
          },
          800: {
            items: 1,
            stagePadding: 100
          },
          1000: {
            items: 1,
            stagePadding: 200
          },
          1200: {
            items: 1,
            stagePadding: 250
          },

        }
      }) 
      if($(window).width()<1000){
      }
    });
    this.id = this.activatedroute.snapshot.queryParams.id;

    this.http.get('https://api.ipify.org?format=json').subscribe((data: any) => {
      console.log(data)
      localStorage.setItem('myip', JSON.stringify(data))
    }) 
  }
  
//getting local ip address
private determineLocalIp() {
  window.RTCPeerConnection = this.getRTCPeerConnection();

  const pc = new RTCPeerConnection({ iceServers: [] });
  pc.createDataChannel('');
  pc.createOffer().then(pc.setLocalDescription.bind(pc));

  pc.onicecandidate = (ice) => {
    this.zone.run(() => {
      if (!ice || !ice.candidate || !ice.candidate.candidate) {
        return;
      }

      this.localIp = this.ipRegex.exec(ice.candidate.candidate)[1];
      var encryptdip = this.userService.encryptData(this.localIp)
      localStorage.setItem('ipaddress', encryptdip)
      
    });
  };
  var ipdata=localStorage.getItem('ipaddress')
  if(!this.IpAddress && !this.ip) this.IpAddress=this.userService.decryptData(ipdata)
}
  //========================CapsLock alert====================================================
  @HostListener('window:resize', ['$event'])
  onResize(event) {
       if(window.innerWidth < 1000) {
         this.mobileMenuShow = false;
       }
       else {

        this.mobileMenuShow = true;
      }
       } 
  @HostListener('window:click', ['$event']) onClick(event) {
    if (event.getModifierState && event.getModifierState('CapsLock')) {
      this.capslockOn = true;
    } else {
      this.capslockOn = false;
    }
    if (this.buttonMobileMenu.nativeElement.contains(event.target)) {
       if(this.mobileMenuShow ) {
      this.mobileMenuShow = false;

    } else {
      this.mobileMenuShow = true;

      
       } 
    } else if(window.innerWidth < 1000) {
      this.mobileMenuShow = false;
    } 
  
  
  }
  @HostListener('window:beforeunload') onBeforeUnload() {

  }
  @HostListener('window:keydown', ['$event'])
  onKeyDown(event) {
    if (event.getModifierState && event.getModifierState('CapsLock')) {
      this.capslockOn = true;
    } else {
      this.capslockOn = false;
    }
  }

  @HostListener('window:keyup', ['$event'])
  onKeyUp(event) {
    if (event.getModifierState && event.getModifierState('CapsLock')) {
      this.capslockOn = true;
    } else {
      this.capslockOn = false;
    }
  }
  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    
   var login =localStorage.getItem('loggedIn')

    if (login != 'true')
    { 
      this.router.navigate(['/']);
      
    }
  }
  @HostListener('window:scroll', ['$event'])
onWindowScroll($event) {
  if (this.buttonMobileMenu.nativeElement.contains(event.target)) {
    if(this.mobileMenuShow ) {
   this.mobileMenuShow = false;

 } else {
   this.mobileMenuShow = true;

   
    } 
 } else if(window.innerWidth < 1000) {
   this.mobileMenuShow = false;
 } 
}
  
  //================================== To open login pop============================================================
  loginmodel() {
    if (this.cookieService.check('u')) {
      this.username = this.userService.decryptData(this.cookieService.get('u'));
      // this.password = this.userService.decryptData(this.cookieService.get('p'));
      this.Remember = true;
    }
        // click on tab email or password field highlighting 
    if (!this.username) {
      setTimeout(() => {
        $("#target").focus();
      }, 1000);
    }
    if(this.username){
      setTimeout(() => {
        $("#PasswordTarget").focus();
      }, 1000);
    }
    
    document.getElementById("loginModalBtn").click();
    document.getElementById("loginclose").click();
  }
  //==============================To open REgistration model================================================
  signupmodel() {
    document.getElementById("sample1").click();
  }
  //=========================choose registration type============================================================
  signupnow() {
    this.hidedata = true
    document.getElementById("sample4").click();
    document.getElementById("sample1").click();
    document.getElementById("sample2").click();
  }
  forgetpassword() {

    setTimeout(() => {
      $("#ForgetPasswordemail").focus();
    }, 1000);
    
    this.email = '';
    this.login = false;
    this.reset = true;
    this.reset1 = true;
    this.otpTextBox = false
  }
  
  passwordUpdated() {
    this.show1 = true;
    this.reset = true;
    this.reset1 = false
  }
  individualClick(title) {
    if (title == 'inv') {
      this.type = 'individual';
      this.individualclick = true
      this.organisationclick = false;
    }
    else {
      this.type = 'organisation';
      this.individualclick = false
      this.organisationclick = true
    }
  }

  checkorg = false
  formOpen() {
    if (!this.name) {
      setTimeout(() => {
        $("#target1").focus();
      }, 1000);
    }
    this.checkorg = false
    if (this.individualclick) {
      this.checkorg = false
      this.individual = true;
      this.hidedata = false
    }
    if (this.organisationclick) {
      this.organisation = true;
      this.hidedata = false
    } else {
      this.checkorg = true
    }
  }


  
  email1: any;
  /****************signin Functions******************/
  signin = function (user) {
    this.check = true;
    this.iserror = false;
    if(this.iebrowser)
    {
      if (!user.valid) this.passwoedinvalid=true ;
    } 
     if(user.value) this.email1 = user.value.username.toLowerCase()
    if (user.valid) {
      this.iserror = false;
      user.value.username = user.value.username.toLowerCase()
      this.generalservice.checkLogin(user.value).subscribe(data => {
        this.check = false;
        if (data.token) {
          // for remember me storing in cookies
          if (user.value.Remember) {
            this.cookieService.set('u', this.userService.encryptData(user.value.username), 6); //6 days
            this.cookieService.set('p', this.userService.encryptData(user.value.password), 6); //6 days 
          }
          // if remmeber me is unchecked deleting from cookies.
          else {
            // if (user.value.username == this.userService.decryptData(this.cookieService.get('u'))) {
              this.cookieService.delete('u');
              this.cookieService.delete('p');
            // }
          }
          this.userService.setUserLoggedIn(data);
          if (document.getElementById('signInCloseBtn')) document.getElementById('signInCloseBtn').click()
          if (data.user.active == false) this.router.navigate(['/emailactivation']);
          else if (this.id) this.router.navigate(['/allowusers/' + this.id]);
          else if(this.fileid && data.user.active)
          { var sharedata={
            fileid:this.fileid
                  }
            this.documentservice.decryptedvalues(sharedata).subscribe((filedata:any)=>{
          this.documentservice.getSharingPeoples(filedata.decryptdata).subscribe(filedata => {
             var userdata=filedata
             if(userdata.sharingpeoples[0].fromid.email ==data.user.email)
             { 
            this.router.navigate(['filecont/'+this.fileid]);
             }
             else this.router.navigate(['checkuser/'+this.fileid]);
          })
            })
          }
          else {
            if (data.user.role == 'user') this.router.navigate(['/home/myfiles'])
            if (data.user.role == 'admin') this.router.navigate(['/adminnavbar'])
          }
        }
      }, error => {
        if (error == 'Account Verification is pending please verify') {
          if (document.getElementById('signInCloseBtn')) document.getElementById('signInCloseBtn').click();
          var data = { email: this.email1 };
          this.adminservice.resendConfirmationEmail(data).subscribe(data => { });
          this.router.navigate(['/emailactivation/', this.userService.encryptData(this.email1)]);
        }
        this.iserror = true;
        this.errorres = error;

      });
    }
  }
// Restrictspacekey in change password

  
  Restrictspacekey(event) {
  
    if (event.keyCode == 32) {
    
        return false;
    }
}
  
Restrictcharacter(event) {

  if (event.keyCode == 118) {
  
      return false;
  }
}

  /*****************Password pattern validation*******************/

  validate(password) {
    this.passwordMinLength = false;
    this.passwordupper = false;
    this.passwordLower = false;
    this.passwordNumber = false;
    this.passwordSpecial = false;
    var minMaxLength = /^[\s\S]{8,32}$/,
      upper = /[A-Z]/,
      lower = /[a-z]/,
      number = /[0-9]/,
      special = /[ !"#$%&()*+,\-./:;<=>?@[\\\]^_`{|}~]/;

    if (minMaxLength.test(password)) {
      this.passwordMinLength = true;
    }
    if (upper.test(password)) {
      this.passwordupper = true;
    }
    if (lower.test(password) && password != undefined) {
      this.passwordLower = true;
    }
    if (number.test(password)) {
      this.passwordNumber = true;
    }
    if (special.test(password)) {
      this.passwordSpecial = true;
    }
  }
  message:any;
  onKeyDownemail1(email) { //Check whether Email exits 
    var regexp = new RegExp('([A-Za-z]|[0-9])[A-Za-z0-9.]+[A-Za-z0-9]@((?:[-a-z0-9]+\.)+[a-z]{2,})')
    this.check1 = false;
    this.message=null
    if (regexp.test(email)) {
      this.userService.getUserData(email.toLowerCase()).subscribe(data => {
        this.userdata = data
        this.emailchecked = true;
        if(this.userdata.provider || this.userdata.email){
          this.check1 = true;
          if(this.userdata.provider) this.message = "This Email is already registered/logged-in with "+this.userdata.provider+". Try to login with "+this.userdata.provider
          else this.message = "This Email is already registered/logged-in with credentials. Try to login with your credentials"
        }
      })
    }
  }

  /*****************signup Functions*******************/

  onKeyDownemail(email) { //Check whether Email exits 
    var regexp = new RegExp('([A-Za-z]|[0-9])[A-Za-z0-9.]+[A-Za-z0-9]@((?:[-a-z0-9]+\.)+[a-z]{2,})')
    this.check1 = false;
    if (regexp.test(email)) {
      this.userService.getemail(email.toLowerCase()).subscribe(data => {
        this.userdata = data
        this.emailchecked = true;
        if (this.userdata.data) {
          this.check1 = true
        }
      })
    }
  }


  onKeyDownSignupemail(email) { //Check whether Email exits 
    var regexp = new RegExp('([A-Za-z]|[0-9])[A-Za-z0-9.]+[A-Za-z0-9]@((?:[-a-z0-9]+\.)+[a-z]{2,})')
    this.check2 = false;
    if (regexp.test(email)) {
      this.userService.getemail(email.toLowerCase()).subscribe((data: any) => {
        this.userdata = data
        this.emailchecked = true;
        if (this.userdata.data && this.userdata.user && !this.userdata.user.active) {
          this.emailcheck = true
          this.check2 = false
        }
        else if (this.userdata.data) {
          this.check2 = true
          this.emailcheck = false
        }
      })
    }
  }
  Checking(e){
    if(e.code=="Enter" && !this.Remember){
      this.Remember=true;
    }
    else if(e.code=="Enter" && this.Remember){
      this.Remember=false;
    }
  }
  onKeyDownorgemail(email) {
    var regexp = new RegExp('([A-Za-z]|[0-9])[A-Za-z0-9.]+[A-Za-z0-9]@((?:[-a-z0-9]+\.)+[a-z]{2,})')
    this.check3 = false;
    if (regexp.test(email)) {
      this.userService.getemail(email.toLowerCase()).subscribe(data => {
        this.userdata = data
        this.emailchecked = true;
        if (this.userdata.data && this.userdata.user && !this.userdata.user.active) {
          this.orgemailcheck = true
          this.check3 = false
        }
        else if (this.userdata.data) {
          this.check3 = true
          this.orgemailcheck = false
        }
      })
    }
  }

  // onKeyDownstartfreetrialemail(emailForSignup) {
  //   var regexp = new RegExp('([A-Za-z]|[0-9])[A-Za-z0-9.]+[A-Za-z0-9]@((?:[-a-z0-9]+\.)+[a-z]{2,})')
  //   this.check4 = false;
  //   if (regexp.test(emailForSignup)) {
  //     this.userService.getemail(emailForSignup.toLowerCase()).subscribe(data => {
  //       this.userdata = data
  //       this.emailchecked = true;
  //       if (this.userdata.data) {
  //         this.check4 = true
  //       }
  //     })
  //   }
  // }
  num1:any;
  num2:any;
  num3:any;
  num4:any;
  num5:any;
  num6:any;
pasteotp(event: ClipboardEvent)
{
//console.log(event)
  let clipboardData = event.clipboardData ||  window["clipboardData"];
  let pastedText = clipboardData.getData('text');
  if(pastedText.length > 1){
    pastedText = pastedText.split('');
    for(let i = 0; i <= pastedText.length; i++ ) 
    {
      if(i == 0 ) this.num1 = pastedText[i];
      else if(i == 1 ) this.num2 = pastedText[i];
      else if(i == 2 ) this.num3 = pastedText[i];
      else if(i == 3 ) this.num4 = pastedText[i];
      else if(i == 4 ) this.num5 = pastedText[i];
      else if(i == 5 ) this.num6 = pastedText[i];
      $("input[name='otp"+i+"']").focus(); 
    }

  }

}
isDelete:any=true
ConfirmPassword
cPassword
closeforget(formName)
{
  this.ConfirmPassword=''
  this.cPassword=''
  this.displayerror=false;
  this.errorres='';
  this.check1=false;
  this.req1=false;
  if (formName) { formName.resetForm();  }
}
  closeModel(formName) {
    if (formName) { formName.resetForm(); this.check = false; }
    this.hide = true
    this.hide1 = true
    this.otpTextBox = false;
    this.changepassword = false;
    this.emailinvalid=false
    this.passwoedinvalid=false
          this.usernameinvalid=false
          this.invalidmobile=false
  }
  closeModelsocial(formName){
    if (formName) { formName.resetForm(); this.check1 = false; }
    if(this.isDelete){
      this.userService.deleteDoc(this.decryptedData.twitter_id || this.decryptedData.facebook_id).subscribe(data=>{
      })
    }
  }
  //========================close mark function for all pop ups=======================================
  closeModel1(form) {
    this.reset1 = true
    document.getElementById("loginclose").click();
    this.formSubmitted = false
    this.organisation_formSubmitted = false
    if (form) form.resetForm();
    this.emailinvalid=false
    this.passwoedinvalid=false
          this.usernameinvalid=false
          this.invalidmobile=false
  }
  escaptdisable(){
    this.reset1 = true
    this.router.navigate(["/"])
  }
  //========================Email Check in signup form=============================================================================
  Emailcheck(email) {
    var regexp = new RegExp('([A-Za-z]|[0-9])[A-Za-z0-9.-]+[A-Za-z0-9]@((?:[-a-z0-9]+\.)+[a-z]{2,})')
    if (regexp.test(email)) {
      this.userService.getallemail({ email: email.toLowerCase() }).subscribe(data => {
        this.userdata = data
        if (this.userdata.length > 0) {
          if (this.userdata[0].provider == 'google') {
            if (!this.userdata[0].password) this.upadtepassword = true
          }
        }

      })
    }
  }
  //=================================signup usertype selections=========================================================================
  email2: any;
  signup = function (data, title) {
    this.IpAddress= JSON.parse(localStorage.getItem('mylocation'));
    this.ip=JSON.parse(localStorage.getItem('myip'));
    if (title == 'individual') 
    {
      this.formSubmitted = true;
      if (!data.valid) 
      { if(this.iebrowser)
        {
          this.emailinvalid=true
          this.passwoedinvalid=true
          this.usernameinvalid=true
        }

      }
    }
    if (title == 'organisation'){
      if (!data.valid) 
      { if(this.iebrowser)
        {
          this.emailinvalid=true
          this.passwoedinvalid=true
          this.usernameinvalid=true
          this.invalidmobile=true
        }

      }
      this.organisation_formSubmitted = true;
    } 
    if (this.type) {
      data.value.type = this.type;
      this.displayerror = false;
      this.email2 = data.value.email;
      
      if (data.valid && this.check == false) {
        if (title == 'individual') this.formSubmitted = false;
        if (title == 'organisation') this.organisation_formSubmitted= false;
        data.value.IP=(this.IpAddress)? this.IpAddress.ip :(this.ip)? this.ip.ip: 'not avilable'
        this.adminservice.saveuser(data.value).subscribe(data => {
          if (data.token) {
            data.token = data.token
            data.user = data
            document.getElementById('signUpCloseBtn').click()
            this.userService.setUserLoggedIn(data)
            this.router.navigate(['/emailactivation', this.userService.encryptData(this.email2)]);
          }
        })
      }
    }

  }

  onBlurMethod1(email) {
    this.check1 = false;
    var regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (regexp.test(email)) {
      this.userService.getemail(email.toLowerCase()).subscribe(data => {
        this.userdata = data
        if (!this.userdata.data) {
          this.check1 = true
        }
      })
    }
    if (!regexp.test(email)) {

      this.check1 = true;
      this.check = false;
    }

  }
  checkuseremil(email)
  {
    this.isEmailLoaded=false;
    this.displayerror=false;
    this.errorres=''
      var regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
      if (regexp.test(email)) {
        this.userService.getemail(email.toLowerCase()).subscribe(data => {
          this.userdata = data
          this.isEmailLoaded=true;
          if (!this.userdata.data) {
            this.check1 = true
          }
          else {
            this.check1=false;
            if(this.userdata.user && !this.userdata.user.status){
              this.displayerror=true;
              this.errorres='Account is blocked, Please contact admin.'
            }
          }
        })
      }

  
    
  }


  //=================================Sending mail rearding forgot password=====================================
  sendOtp(usermailform) {
    this.IpAddress= JSON.parse(localStorage.getItem('mylocation'));
    this.ip=JSON.parse(localStorage.getItem('myip'));
   if(usermailform.value.email=="" || usermailform.value.email==undefined )
   {
    this.req1=true
   }
   else this.req1=false
    clearInterval(this.timer);
    var email = usermailform.value.email
    if (usermailform.valid) {
      if(!this.check1 && !this.displayerror && !this.errorres && this.isEmailLoaded)
      {
        this.loadergif=true
        this.displayerror = false
        this.errorres = ""
        var emaill = email.toLowerCase();
        this.useremail = emaill
        var user = { email: emaill,IpAddress:(this.IpAddress)? this.IpAddress.ip :(this.ip)? this.ip.ip: 'not avilable'}
        this.userService.forgotPassEmail(user).subscribe((data:any) => {
          if (data.res == "success") {
            this.otpTextBox = true;
            setTimeout(() => {
              $("#otpfield").focus();
            },100);
            
            this.loadergif=false
            this.maxTime = 120;
            this.reset1 = false;
            this.StartTimer();
            usermailform.resetForm()
          }
          else if (data.res) {
            this.errorres = data.res
            this.displayerror = true;
            this.loadergif=false;
          }
          // this.otpres = data
        });
     
      }


      }
      else this.req1=true

  }
  cancel(user) {
    user.resetForm();
  }
  //============================================OTP verification for forgot password=============================================
  otpVerification = function (user) {
    this.loader = false;
    const ConfirmationDiaBox = this.dialog.open(CommonDialogComponent, {
      width: '500px',
      disableClose: true,
      autoFocus: true,
      data: { title: "OTP sent to your Email ID", content: "Enter OTP", otpflag: true, errorMsg: this.errorres }
    });

    ConfirmationDiaBox.afterClosed().subscribe(result => {
      if (result) {
        var otpObj = { otp: result, email: user.email };
        this.userService.verifyOtp(otpObj).subscribe(data => {
          if (data.res == "OTP-expired") {
            this.errorres = "Your OTP is expired... Please click on resend to get new one ."
            this.displayerror = true;
          }
          else if (data.res == "OTPFAILED") {
            this.errorres = "Enter correct OTP"
            this.otpVerification(user);
          }
          else if (data.res == "block") {
            this.errorres = "Your account is blocked... Please contact admin..."
            this.displayerror = true;
            this.dialogOpen('block', "Your account is blocked. Please contact Admin.");
          }
          else if (data.res == "success") {
            this.check = false;
            this.changepassword = true;
            this.useremail = user.email.toLowerCase();
            user.resetForm();
          }
        });
      }
    });


  }
  req = false
  changePass = function (Pass) {
    this.IpAddress= JSON.parse(localStorage.getItem('mylocation'));
    this.ip=JSON.parse(localStorage.getItem('myip'));
    this.req = true
    this.errorres=''
  
    if (Pass.valid && Pass.value.cPassword == Pass.value.ConfirmPassword) {
      var passData = { newPass: Pass.value.ConfirmPassword, email: this.useremail ,IpAddress : (this.IpAddress)?this.IpAddress.ip :(this.ip)? this.ip.ip:'not avilable'}
      this.userService.changeForgotPass(passData).subscribe(data => {
        if (data.res == "success") {
          this.passwordUpdated();
          this.changepassword = false;
          this.resetimg = true
          this.otpTextBox = false;
          this.upadtepassword1 = false
          Pass.resetForm();
        }
      });
    
    }
  }
  signinFacebook(formData){
    if(formData.valid && !this.check1){
      this.type = 'individual';
      this.individualclick = true
      this.organisationclick = false;
      formData.value.facebook_id = this.decryptedData.facebook_id
      this.userService.facebookLogin(formData.value).subscribe((data:any)=>{
        this.isDelete = false;
        document.getElementById('fbemailCloseBtn').click();
        this.userService.setUserLoggedIn(data);
        if (data.user.role == 'user') this.router.navigate(['/home/myfiles/'])
      })
    }
    
  }
  signinTwitter(formData){
    if(formData.valid && !this.check1){
      this.type = 'individual';
      this.individualclick = true
      this.organisationclick = false;
      formData.value.twitter_id = this.decryptedData.twitter_id
      this.userService.twitterLogin(formData.value).subscribe((data:any)=>{
        this.isDelete = false;
        document.getElementById('emailCloseBtn').click();
        this.userService.setUserLoggedIn(data);
        if (data.user.role == 'user') this.router.navigate(['/home/myfiles/'])
      })
    }
    
  }
  resetimg = true
  dataSubmit = function (otpData) {
    this.passwoedinvalid=false
    this.emailinvalid=false
    this.IpAddress= JSON.parse(localStorage.getItem('mylocation'));
    this.ip=JSON.parse(localStorage.getItem('myip'));
    var optvalue = otpData.value
    this.formCheck = true
    if (otpData.valid) {
      this.formCheck = false
      var otpObj = { otp: optvalue.otp0 + optvalue.otp1 + optvalue.otp2 + optvalue.otp3 + optvalue.otp4 + optvalue.otp5, email: this.useremail,IP:(this.IpAddress)? this.IpAddress.ip :(this.ip)? this.ip.ip: 'not avilable' };
      this.userService.verifyOtp(otpObj).subscribe(data => {
        if (data.res == "OTP-expired") {
          this.errorres = "Your OTP is expired... Please click on resend to get new one."
          this.displayerror = true;
          if (otpData) { otpData.resetForm(); this.req = false }
        }
        else if (data.res == "OTPFAILED") {
          this.displayerror = true;
          this.errorres = "Invalid OTP"
          // this.otpVerification(user);
        }
        else if (data.res == "block") {
          this.errorres = "Your account is blocked... Please contact admin..."
          this.displayerror = true;
          // this.dialogOpen('block', "Your account is blocked. Please contact Admin.");
        }
        else if (data.res == "success") {
          this.check = false;
          this.changepassword = true;
          this.register = false
          this.login = false
          this.resetimg = false
          otpData.resetForm();
          setTimeout(() => {
            $("#newPasswordemail").focus();
          }, 1000);
          clearInterval(this.timer)
          this.useremail = this.useremail.toLowerCase();
        }
      });
      // this.dialogRef.close(otpData.value.otp);
    }
  }
  saveCookie

  facebook() {
    // window.open("http://localhost:9000/auth/facebook");
    location.href = "https://nodestage.docintact.com/auth/facebook"
  }
  google() {
    // window.open("http://localhost:9000/auth/google")

    location.href = "https://nodestage.docintact.com/auth/google"

  }
  twitter() {
    // window.open("http://localhost:9000/auth/twitter")
    location.href = "https://nodestage.docintact.com/auth/twitter"
    
  }
  checkemail1(usernamecheck)
  {
    if((usernamecheck.value=='' || usernamecheck.value== undefined) && this.iebrowser)
    {
   this.emailinvalid=true
    }
    else 
    {
   this.emailinvalid=false
      
    }
  }
  checkpassword(data)
  {
    if((data.value=='' || data.value== undefined) && this.iebrowser)
    {
this.passwoedinvalid=true
    }
    else
    {
this.passwoedinvalid=false
    }
 
  }
  checkusername(data)
  {
    if((data.value=='' || data.value== undefined) && this.iebrowser)
    {
      this.usernameinvalid=true
    }
    else
    {
       this.usernameinvalid=false
    }
 
  
  }
  checkmobile(data)
  {
    if((data.value=='' || data.value== undefined) && this.iebrowser)
    {
      this.invalidmobile=true
    }
    else
    {
       this.invalidmobile=false
    }
 
  
  }
  //=================================blur methods for singnup form===============================
  errors = false
  checkp(password,event,form) {
    if(event.code=="Enter" || event.code=="NumpadEnter"){
      this.signin(form)
    }
    this.iserror=false
    if (password == undefined || password == '')
      this.errors = true
    else
      this.errors = false
  }

  checkemail(username) {
    if (username == undefined || username == '')
      this.errors = true
    else
      this.errors = false
  }

  checknameerr(name) {
    if (name == undefined || name == '')
      this.errors = true;
    else
      this.errors = false
  }

  checkemailer(email) {

    if (email == undefined || email == '')
      this.errors = true
    else
      this.errors = false
  }

  checkpasserr(password) {
    if (password == undefined || password == '')
      this.errors = true
    else
      this.errors = false
  }

  checknameer(name) {
    if (name == undefined || name == '')
      this.errors = true
    else
      this.errors = false
  }
  checkmober(mobilenumber) {
    if (mobilenumber == undefined || mobilenumber == '')
      this.errors = true
    else
      this.errors = false
  }
  //=======================================autoFocus for Forget Password Field===================================
  next(event, next, prev) {

    var charLimit = 1;
        var keys = [8, 9,13, /*16, 17, 18,*/, 19, 20, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46,48,,96, 97,98,99,100,101,102,103,104,105,86,144, 145];
      
        if (event.which == 8 && event.target.value.length == 0) {
           if(prev) prev.focus();
        } else if ($.inArray(event.which, keys) >= 0) {
            return true;
        } else if (event.target.value.length >= charLimit) {
           if(next) next.focus();
            return false;
        } else if (event.shiftKey || event.which <= 48 || event.which >= 58) {
            return false;
        }

  } 
  next2(event, next, prev)
  {
    var charLimit = 1;
        if (event.target.value.length >= charLimit) {
         if(next) next.focus();
            return false;
        }
  
  }

  //==============================================Resend Otp==========================================================
  otpresend = function () {

    this.loadergif2=true
    var user = { email: this.useremail,IpAddress:(this.IpAddress)? this.IpAddress.ip :(this.ip)? this.ip.ip: 'not avilable' }
    this.userService.forgotPassEmail(user).subscribe(data => {
      this.displayerror = false;
      this.req1 = true;
      
      if (data.res == "success") {
        this.loadergif2=false
        this.maxTime = 120;
        clearInterval(this.timer)

        this.StartTimer();
      }
      else if (data.res == "block") {
        this.loadergif2=false
        this.errorres = "Your account is blocked... Please contact admin..."
        this.displayerror = true;
      }
      // this.otpres = data
    });

  }


 
  //=======================================OTP Timer========================================================================
  StartTimer() {
    this.timer = setInterval(() => {
      if (this.time < this.maxTime) {
        this.maxTime -= 1;
        const minutes: number = Math.floor(this.maxTime / 60);
        this.showtime = (minutes + ':' + (this.maxTime - minutes * 60));
      }
      else {
        clearInterval(this.timer)
      }
    }, 1000)
  }

  //   //=================================free taril mail for signup========================================================================
  // semdMailForSignup(email) {
  //   console.log(email)
  //   if (email.valid) {
  //     email = { email: email.value.emailForSignup }
  //     this.userService.semdMailForSignup(email).subscribe(data => {
  //       console.log(data)

  //     })
  //     if(this.check4==false)
  //     this.documentservice.openSnackBar("Confirmation send to your mail ", "X")
  //   }
  // }
  private getRTCPeerConnection() {
    return window.RTCPeerConnection ||
      window.mozRTCPeerConnection ||
      window.webkitRTCPeerConnection;
  }
}

export interface DialogData {
  title: string;
  content: string;
  otpflag: boolean;
  errorMsg: string;
  type: string;
}

