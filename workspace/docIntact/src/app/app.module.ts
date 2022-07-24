import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import 'hammerjs';

import { FrontEndConfig } from "./frontendConfig"
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { DateTimeAdapter, OWL_DATE_TIME_FORMATS, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import { MomentDateTimeAdapter } from 'ng-pick-datetime-moment';
import { RouterModule, Router, Routes } from '@angular/router';
import { MatButtonModule, MatCheckboxModule, MatListModule, MatChipsModule } from '@angular/material';
import { MatInputModule, MatSelectModule, MatTreeModule, MatTableModule, MatPaginatorModule, MatRadioModule, MatSidenavModule, MatNativeDateModule, MatSortModule, MatMenuModule, MatGridListModule } from '@angular/material'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSliderModule } from '@angular/material/slider';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SignaturePadModule } from '@ng-plus/signature-pad'
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { ConfirmEqualValidatorDirective } from './validator';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';


import { TooltipModule } from 'ng2-tooltip-directive';

import { DocumentService } from './document.service';
import { AdminService } from './admin.service'
import { UserService } from './user.service';

import { CommonDialogComponent } from './common-dialog/common-dialog.component';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatExpansionModule } from '@angular/material/expansion';

import { DialogboxComponent } from './dialogbox/dialogbox.component';

import { AdddepartmentComponent } from './adddepartment/adddepartment.component'

import { DepartmentdialogComponent } from './departmentdialog/departmentdialog.component';
import { AddemployeeComponent } from './addemployee/addemployee.component';

import { EmployeedialogComponent } from './employeedialog/employeedialog.component';
import { AnimateOnScrollModule } from 'ng2-animate-on-scroll';
import { ParticleEffectButtonModule } from "angular-particle-effect-button";

import { FileDropModule } from 'ngx-file-drop';
import { DataService } from './core/data.service';

import { SafeHtmlPipe } from './safe-html';
import { PushNotificationsService } from './push-notifications.service';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ImageCropperModule } from 'ngx-image-cropper';
// import { FolderoutsidemanagerComponent} from './folderoutsidemanager/folderoutsidemanager.component';
import { FileuploadService } from './fileupload.service'
import { ResizableModule } from 'angular-resizable-element';
// import { UploadimgComponent}from './uploadimg/uploadimg.component'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { FilepointersComponent } from './filepointers/filepointers.component';
import { ColorPickerModule } from 'ngx-color-picker';

import { MatTooltipModule } from '@angular/material/tooltip';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MatTabsModule } from '@angular/material/tabs';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
// import { ImageCropperModule } from 'ngx-image-cropper';

import { FONT_PICKER_CONFIG } from 'ngx-font-picker';
import { FontPickerModule, FontPickerConfigInterface } from 'ngx-font-picker';
import { AllowusersComponent } from './allowusers/allowusers.component';

import { ChatComponent } from './chat/chat.component';
const DEFAULT_FONT_PICKER_CONFIG: FontPickerConfigInterface = {
  // your Google API key
  apiKey: 'AIzaSyBF_BmY30XV-xVPpphAoKmRlJQn-ek46uI'
};
import { ContentEditableFormDirective } from './content-editable-form.directive';
import { MovetoComponent } from './moveto/moveto.component';

import { HomComponent } from './hom/hom.component';
import { SignupmailconfirmComponent } from './signupmailconfirm/signupmailconfirm.component'
import { MailConfirmComponent } from './mail-confirm/mail-confirm.component';
import { OrganizationFileSharingComponent } from './organization-file-sharing/organization-file-sharing.component'
import { OrganizationService } from './organization.service'
import { UploadLinkComponent } from './upload-link/upload-link.component'

import { AvatarModule } from 'ngx-avatar';
import { FilterPipe } from './filter.pipe';
import { TemplteFilterPipe } from './templatefilter'
import { FavoritefilesComponent } from './favoritefiles/favoritefiles.component'
import { MyfilesComponent } from './myfiles/myfiles.component'
import { MainnavComponent } from './mainnav/mainnav.component';
import { FiledocumentComponent } from './filedocument/filedocument.component'
import { AfterConfirmationComponent } from './after-confirmation/after-confirmation.component';
import { SignupemployeeComponent } from './signupemployee/signupemployee.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { CookieService } from 'ngx-cookie-service';

import { BinfilesComponent } from './binfiles/binfiles.component';
import { AgreementcopyComponent } from './agreementcopy/agreementcopy.component';
import { WebcamModule } from 'ngx-webcam';
import { FileSizeModule } from 'ngx-filesize';

// import { FavoritesComponent } from './favorites/favorites.component';
import { SharedFilesComponent } from './shared-files/shared-files.component';

import { SentfilesComponent } from './sentfiles/sentfiles.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { InternationalPhoneNumberModule } from 'ngx-international-phone-number';
import { TransactionVerifyComponent } from './transaction-verify/transaction-verify.component'
import { AunthicateComponent } from './aunthicate/aunthicate.component'
import { SharepopupComponent } from './sharepopup/sharepopup.component';
import { DndModule } from "ngx-drag-drop";
import { AfterloginComponent } from './afterlogin/afterlogin.component';
import { ShareviewComponent } from './shareview/shareview.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { AdminpanelComponent } from './adminpanel/adminpanel.component';
import { AdminUserdetailsComponent } from './admin-userdetails/admin-userdetails.component';
import { from } from 'rxjs';
import { DateFilterPipe } from './date-filter.pipe';
import { DocFields } from "./agreementcopy/docfields"
import { CommonModule, DatePipe } from '@angular/common';

import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import { SearchresultComponent } from './searchresult/searchresult.component';
import { CountdownModule } from 'ngx-countdown';
import { NewsignupComponent } from './newsignup/newsignup.component';
import { AdminviewComponent } from './adminview/adminview.component';
import { NearmapsComponent } from './nearmaps/nearmaps.component';
import {SignupdialogboxComponent} from './signupdialogbox/signupdialogbox.component';
import { NearMapsPopupComponent } from './near-maps-popup/near-maps-popup.component';
import { AuditlogComponent } from './auditlog/auditlog.component';
import { TemplatesComponent } from './templates/templates.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { AboutusmainComponent } from './aboutusmain/aboutusmain.component';
import { ContactusComponent } from './contactus/contactus.component';
import { HomepageComponent } from './homepage/homepage.component';
import { FeaturesComponent } from './features/features.component';
import { TermsandconditionComponent } from './termsandcondition/termsandcondition.component';
import { FaqComponent } from './faq/faq.component';
import { APP_BASE_HREF } from '@angular/common';
import { MaillinksComponent } from './maillinks/maillinks.component';
import { DocumentverificationComponent } from './documentverification/documentverification.component';
import { PrivacyComponent } from './privacy/privacy.component';

export function getBaseHref(): string {
  return window.location.pathname;
} 

export const MY_CUSTOM_FORMATS = {
  parseInput: 'LL LT',
  fullPickerInput: 'DD:MM:YYYY hh:mm:ss a',
  datePickerInput: 'LL',
  timePickerInput: 'LT',
  monthYearLabel: 'MMM YYYY',
  dateA11yLabel: 'LL',
  monthYearA11yLabel: 'MMMM YYYY',
};

@NgModule({
  declarations: [
    AppComponent,

    CommonDialogComponent,

    DialogboxComponent,

    AdddepartmentComponent,

    DepartmentdialogComponent,
    AddemployeeComponent,

    EmployeedialogComponent,

    SafeHtmlPipe,
    AllowusersComponent,

    ChatComponent,
    ContentEditableFormDirective,
    ConfirmEqualValidatorDirective,
    MovetoComponent,
    HomComponent,
    SignupmailconfirmComponent,
    MailConfirmComponent,
    OrganizationFileSharingComponent,
    UploadLinkComponent,
    FilterPipe,
    TemplteFilterPipe,
    MyfilesComponent,
    SentfilesComponent,
    MainnavComponent,
    FiledocumentComponent,
    AfterConfirmationComponent,
    FavoritefilesComponent,
    SignupemployeeComponent,
    BinfilesComponent,
    AgreementcopyComponent,
    // FavoritesComponent,
    SharedFilesComponent,
    TransactionVerifyComponent,
    SharepopupComponent,
    AfterloginComponent,
    ShareviewComponent,
    AunthicateComponent,
    AdminNavbarComponent,
    AdminpanelComponent,
    AdminUserdetailsComponent,
    SearchresultComponent,
    NewsignupComponent,
    AdminviewComponent,
    NearmapsComponent,
    SignupdialogboxComponent,
    DateFilterPipe,
    NearMapsPopupComponent,
    // UploadimgComponent,
    AuditlogComponent,
    TemplatesComponent,
    AboutusComponent,
    AboutusmainComponent,
    ContactusComponent,
    HomepageComponent,
    FeaturesComponent,
    TermsandconditionComponent,
    FaqComponent,
    MaillinksComponent,
    DocumentverificationComponent,
    PrivacyComponent,
  ],
  imports: [
    BrowserModule,
    CountdownModule,
    AppRoutingModule,
    MatChipsModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    FormsModule,
    HttpClientModule,
    MatInputModule,
    TooltipModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    MatSliderModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatMenuModule,
    MatCardModule,
    MatIconModule,
    MatRadioModule,
    MatDialogModule,
    MatSortModule,
    MatTreeModule,
    MatListModule, MatMenuModule,
    MatGridListModule,
    DragDropModule,
    MatFormFieldModule,
    MatSidenavModule,
    AnimateOnScrollModule,
    ParticleEffectButtonModule,
    FileDropModule,
    NgxMatSelectSearchModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    SignaturePadModule,
    NgbModule,
    ColorPickerModule,
    MDBBootstrapModule.forRoot(),
    NgCircleProgressModule.forRoot({
      "backgroundPadding": 7,
      "radius": 20,
      "space": -2,
      "outerStrokeWidth": 2,
      "outerStrokeColor": "#808080",
      "innerStrokeColor": "#e7e8ea",
      "innerStrokeWidth": 2,
      "clockwise": true,
      "showTitle": false,
      "showSubtitle": false,
      "showUnits": false,
    }),
    MatTooltipModule,
    MatAutocompleteModule,
    MatTabsModule,
    ResizableModule,
    FlexLayoutModule,
    FontPickerModule,
    FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(),
    PdfViewerModule,
    AvatarModule,
    MatExpansionModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    WebcamModule,
    FileSizeModule,
    InternationalPhoneNumberModule,
    NgxIntlTelInputModule,
    DndModule,
    ImageCropperModule, 
    AngularDateTimePickerModule
  ],
  providers: [DatePipe,DocFields,CookieService, FrontEndConfig, { provide: DateTimeAdapter, useClass: MomentDateTimeAdapter, deps: [OWL_DATE_TIME_LOCALE] },
    { provide: OWL_DATE_TIME_FORMATS, useValue: MY_CUSTOM_FORMATS }, AdminService, DocumentService, UserService, OrganizationService, DataService, PushNotificationsService, FileuploadService, { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },{provide: APP_BASE_HREF,useValue:'/'}, { provide: FONT_PICKER_CONFIG, useValue: DEFAULT_FONT_PICKER_CONFIG }],
  entryComponents: [CommonDialogComponent, SharepopupComponent,SignupdialogboxComponent, DialogboxComponent, DepartmentdialogComponent, EmployeedialogComponent, MovetoComponent, OrganizationFileSharingComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }