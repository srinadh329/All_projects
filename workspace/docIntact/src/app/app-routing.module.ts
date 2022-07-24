import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DialogboxComponent } from './dialogbox/dialogbox.component'
import { AdddepartmentComponent } from './adddepartment/adddepartment.component'
import { AddemployeeComponent } from './addemployee/addemployee.component';
import { AllowusersComponent } from './allowusers/allowusers.component';
import { ChatComponent } from './chat/chat.component';
import { HomComponent } from './hom/hom.component';
import { SignupmailconfirmComponent } from './signupmailconfirm/signupmailconfirm.component';
import { MailConfirmComponent } from './mail-confirm/mail-confirm.component';
import { UploadLinkComponent } from './upload-link/upload-link.component';
import { MainnavComponent } from './mainnav/mainnav.component';
import { FiledocumentComponent } from './filedocument/filedocument.component';
import { SignupemployeeComponent } from './signupemployee/signupemployee.component';

import { BinfilesComponent } from './binfiles/binfiles.component';
import { AgreementcopyComponent } from './agreementcopy/agreementcopy.component';
import { FavoritefilesComponent } from './favoritefiles/favoritefiles.component';
import { SharedFilesComponent } from './shared-files/shared-files.component';
import { SentfilesComponent } from './sentfiles/sentfiles.component'
import { TransactionVerifyComponent } from './transaction-verify/transaction-verify.component'
import { AfterloginComponent } from './afterlogin/afterlogin.component';
import { ShareviewComponent } from './shareview/shareview.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { AdminpanelComponent } from './adminpanel/adminpanel.component';
import { AdminUserdetailsComponent } from './admin-userdetails/admin-userdetails.component';
import { SearchresultComponent } from './searchresult/searchresult.component';
import { NewsignupComponent } from './newsignup/newsignup.component';
import { AdminviewComponent } from './adminview/adminview.component';
import { AuditlogComponent } from './auditlog/auditlog.component';
import { TemplatesComponent } from './templates/templates.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { FeaturesComponent } from './features/features.component';
import { TermsandconditionComponent } from './termsandcondition/termsandcondition.component';
import { FaqComponent } from './faq/faq.component';
import { MaillinksComponent } from './maillinks/maillinks.component';
import { DocumentverificationComponent } from './documentverification/documentverification.component';
import { PrivacyComponent } from './privacy/privacy.component';

const routes: Routes = [

  {
    path: '', component: HomComponent,
    children: [
      { path: '', component: HomepageComponent },
      { path: 'about', component: AboutusComponent },
      { path: 'contact', component: ContactusComponent },
      { path: 'features', component: FeaturesComponent },
      { path: 'termsandconditions', component: TermsandconditionComponent },
      { path: 'faq', component:FaqComponent },
      {path:'verification',component:DocumentverificationComponent},
      {path:'privacy',component:PrivacyComponent}
    ]
  },
  // { path: '', component: HomComponent },
 // { path: 'signup/:id', component: NewsignupComponent },
 {path:'privacypolicy',component:PrivacyComponent},
 { path: 'termsandcondition', component: TermsandconditionComponent },

  { path: 'emailactivation/:id', component: MailConfirmComponent },
  { path: 'signupemployee/:id', component: SignupemployeeComponent },
  { path: 'signupemailconfirm/:id', component: SignupmailconfirmComponent },
  { path: 'allowusers/:id', component: AllowusersComponent },
  { path: 'uploadbylink/:id', component: UploadLinkComponent },
  {path:'checkuser/:id',component:MaillinksComponent},
  {
    path: 'adminnavbar', component: AdminNavbarComponent,
    children: [{ path: 'adminpanel', component: AdminpanelComponent },
    { path: 'userdetails', component: AdminUserdetailsComponent },
    ]
  },
  // {path:'uploadimg',component:UploadimgComponent},
  {
    path: 'home', component: MainnavComponent,
    children: [
      { path: 'dashboard', component: AdminviewComponent },
      { path: '', component: AfterloginComponent },
      { path: 'myfiles', component: FiledocumentComponent },
      { path: 'myfiles/:id', component: FiledocumentComponent },
      { path: 'favorites/:id', component: FavoritefilesComponent },
      { path: 'favorites', component: FavoritefilesComponent },
      { path: 'shareddocument', component: SharedFilesComponent },
      { path: 'shareddocument/:id', component: SharedFilesComponent },
      { path: 'sentfiles/:id', component: SentfilesComponent },
      { path: 'sentfiles', component: SentfilesComponent },
      { path: 'binfiles', component: BinfilesComponent },
      { path: 'adddepartment', component: AdddepartmentComponent },
      { path: 'addemployee', component: AddemployeeComponent },
      { path: 'search', component: SearchresultComponent },
      { path: 'auditlog', component: AuditlogComponent },
      { path: 'auditlog/:id/:id2', component: AuditlogComponent },

      { path: 'templates', component: TemplatesComponent },

 
    ]
  },
  // { path: 'verification', component:DocumentverificationComponent },
  { path: 'filecont/:id', component: AgreementcopyComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'transaction-verify', component: TransactionVerifyComponent },
  { path: 'transaction-verify/:id/:id2/:id3', component: TransactionVerifyComponent },
  { path: 'dialogbox', component: DialogboxComponent },
  { path: 'sharereview/:id', component: ShareviewComponent },

  { path: 'sharereview/:id/:id2', component: ShareviewComponent },
  { path: 'Sharereview/:id/:id2', component: ShareviewComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }