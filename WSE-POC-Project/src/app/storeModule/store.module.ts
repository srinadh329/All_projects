import { NgModule } from '@angular/core';
import { StoreService } from './store.service';
import { StoreGuardService } from './store.guards';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from '../_helpers/jwt.interceptor';
import { ErrorInterceptor } from '../_helpers/error.interceptor';
import { CommonModule } from '@angular/common';
import { StoreRoutingModule } from './store.routes';
import { NationalBondComponent } from '../storeModule/components/nationalbond/nationalbond.component';
import { MainMenuComponent } from '../storeModule/main-menu/main-menu.component';
import { WesternunionComponent } from '../storeModule/components/westernunion/westernunion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InstantcashComponent } from '../storeModule/components/instantcash/instantcash.component';
import { InstantdraftComponent } from '../storeModule/components/instantdraft/instantdraft.component';
import { DialogboxComponent } from './components/dialogbox/dialogbox.component';
import { StoretableComponent } from './components/storetable/storetable.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MaterialModule } from '../material.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ForeignexchangeComponent } from './components/foreignexchange/foreignexchange.component';
import { TelegraphtransferComponent } from './components/telegraphtransfer/telegraphtransfer.component';
import { DubaipoliceComponent } from './components/dubaipolice/dubaipolice.component';
import { ArabiaComponent } from './components/arabia/arabia.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { RemittanceComponent } from './components/remittance/remittance.component';
import { ReportsComponent } from './components/reports/reports.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatNativeDateModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AvatarModule } from 'ngx-avatar';
import { CommonfunctionsComponent } from './components/commonfunctions';
import { MAT_DATE_LOCALE,SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker';

@NgModule({
    imports: [
        CommonModule,
        StoreRoutingModule,
        FormsModule,
        Ng2SearchPipeModule,
        ReactiveFormsModule,
        MaterialModule,
        NgxPaginationModule,
        MatNativeDateModule,
        MatDatepickerModule,
        AvatarModule,
        SatDatepickerModule, 
        SatNativeDateModule
    ],
    declarations: [
        NationalBondComponent,
        MainMenuComponent,
        WesternunionComponent,
        StoretableComponent,
        ArabiaComponent,
        InstantcashComponent,
        InstantdraftComponent,
        TelegraphtransferComponent,
        ForeignexchangeComponent,
        DubaipoliceComponent,
        DialogboxComponent,
        RemittanceComponent,
        DashboardComponent,
        ReportsComponent,
      ],

    entryComponents: [DialogboxComponent],

    providers: [StoreService, StoreGuardService,CommonfunctionsComponent,
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] },
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }, // you can change useValue
    ]
})
export class StoreModule { }
