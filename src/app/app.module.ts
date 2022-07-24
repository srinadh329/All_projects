import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ImageCompressService,ResizeOptions,ImageUtilityService } from 'ng2-image-compress';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji';

////////////// SERVICES //////////////////////////
import { MessageService } from './services/message.service';
import { UserService } from './services/user.service';
import { LinksService } from './services/links.service';
import { GroupsService } from './services/groups.service';
import { ReportsService } from './services/reports.service';
import { PaymentService } from './services/payment.service';
import { RequestsService } from './services/requests.service';


/////////////// Admin SERVICES ///////////////////////////
import { AdminService } from './admin/adminservices/admin.service'
///////////////////////Auth Guard///////////////////////////////////////////
import { AuthGuard } from './auth_guards/auth.guard';
import { AdminGuard } from './auth_guards/admin.guard';
import { PremiumauthGuard } from './auth_guards/premiumauth.guard'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FrontEndConfig } from "./frontendconfig";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { LoginComponent } from './login/login.component';
import { HomenavbarComponent } from './homenavbar/homenavbar.component';
import { config } from './configFile';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatMenuModule} from '@angular/material/menu';
import {MatExpansionModule} from '@angular/material/expansion';
import { AvatarModule } from 'ngx-avatar';
import {MatBadgeModule} from '@angular/material/badge';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {
  MatToolbarModule, MatFormFieldModule, MatInputModule,
  MatOptionModule, MatSelectModule, MatIconModule,
  MatButtonModule, MatCardModule, MatTableModule,
  MatDividerModule, MatSnackBarModule, MatDialogRef, MAT_DIALOG_DATA, MatDialogModule, MatCheckboxModule, MatButtonToggleModule, MatTabsModule, MatSpinner
} from '@angular/material';
import { OtpdialogComponent } from './otpdialog/otpdialog.component';
import { FormsModule } from '@angular/forms';
import { EncrDecrServiceService } from './services/encr-decr-service.service';
import { MainComponent } from './main/main.component';

import { NavbarComponent } from './navbar/navbar.component';

import { MyInvitationsComponent } from './my-invitations/my-invitations.component';

// import { SearchPipe } from './pipes/search.pipe';
import { ErrorpageComponent } from './errorpage/errorpage.component';

import { PushNotificationsService } from './services/push-notifications.service';
import { NotificationsService } from './services/notifications.service';
import { MessagePipe } from './pipes/message.pipe';
import { ScrolldownDirective } from './scrolldown.directive';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatProgressSpinnerModule} from '@angular/material';
import {MatChipsModule} from '@angular/material/chips';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxFileDropModule } from 'ngx-file-drop';
import {MatRadioModule} from '@angular/material/radio';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { FileSaverModule } from 'ngx-filesaver';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MapviewComponent } from './mapview/mapview.component';
import { LocationmapsComponent } from './locationmaps/locationmaps.component';
import {A11yModule} from '@angular/cdk/a11y';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatListModule} from '@angular/material/list';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSortModule} from '@angular/material/sort';
import {MatTreeModule} from '@angular/material/tree';
import { ReactiveFormsModule } from '@angular/forms';
import { DateagoPipe } from './pipes/dateago.pipe';
import {NgbPaginationModule, NgbAlertModule,NgbModule,NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { MessagemapComponent } from './messagemap/messagemap.component';
import { EmojiComponent } from './emoji/emoji.component';
import { OrganizationsModule } from './organizations/organizations.module';
import { CameraComponent } from './camera/camera.component';
import { SettingsComponent } from './settings/settings.component';
import { BlogComponent, SafeHtmlPipe } from './blog/blog.component';
import { CallComponent } from './call/call.component';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
  import { QuillModule } from 'ngx-quill';
  import { InfiniteScrollModule } from 'ngx-infinite-scroll';
 
@NgModule({

  exports: [
    A11yModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    PortalModule,
    ScrollingModule,
  
    

  ],
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,

    NavbarComponent,
    HomenavbarComponent,
    OtpdialogComponent,

    // SearchPipe,
    MyInvitationsComponent,
  
    ErrorpageComponent,

    MessagePipe,
    ScrolldownDirective,
    DashboardComponent,
    MapviewComponent,
    LocationmapsComponent,
    DateagoPipe,
    MessagemapComponent,
    EmojiComponent,
    CameraComponent,
    SettingsComponent,

    BlogComponent,
    CallComponent,
    SafeHtmlPipe
  ],
  imports: [
    AvatarModule,
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,MatTooltipModule, MatFormFieldModule, MatInputModule,
    MatOptionModule, MatSelectModule, MatIconModule,
    MatButtonModule, MatCardModule, MatTableModule,
    MatDividerModule, MatSnackBarModule, MatDialogModule,
    MatCheckboxModule,
    MatButtonToggleModule,ScrollingModule,
    MatMenuModule,
    MatExpansionModule,
    MatTabsModule,MatBadgeModule,MatProgressSpinnerModule,
    MatTableModule,MatAutocompleteModule,MatChipsModule,NgxSpinnerModule,NgxFileDropModule,
    MatSlideToggleModule,MatRadioModule,ReactiveFormsModule,
    FileSaverModule,
    PickerModule,
    EmojiModule,
    OrganizationsModule,
    MatDatepickerModule,
    AngularFontAwesomeModule,
    InfiniteScrollModule,
    QuillModule.forRoot({
      modules: {
       
      toolbar: [
        
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote','code-block'],
    
        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        // [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        // [{ 'direction': 'rtl' }], 
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        // [{ 'font': [] }],
        [{ 'align': [] }],
    
        ['clean'],                                         // remove formatting button
    
        ['link', 'image', 'video'],                        // link and image, video
      ],
   
    }
    })



    
  ],
  schemas: [NO_ERRORS_SCHEMA],
  entryComponents: [LoginComponent,MapviewComponent,EmojiComponent,CameraComponent,CallComponent],
  providers: [ImageCompressService,ResizeOptions,FrontEndConfig, AuthGuard,
    AdminGuard,
    PremiumauthGuard,
    config,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }, { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    UserService,
    MessageService,
    EncrDecrServiceService,
    LinksService,
    GroupsService,
    ReportsService,
    PaymentService,
    RequestsService,
    AdminService,
    PushNotificationsService,
    NotificationsService
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
