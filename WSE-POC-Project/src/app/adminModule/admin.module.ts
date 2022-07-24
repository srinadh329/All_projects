import { NgModule } from '@angular/core';
import { AdminService } from './admin.service';
import { AdminGuardService } from './admin.guards';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from '../_helpers/jwt.interceptor';
import { ErrorInterceptor } from '../_helpers/error.interceptor';
import { MaterialModule } from '../material.module';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { AdminRoutingModule } from './admin.routes';
import { BranchComponent } from '../adminModule/components/branch/branch.component';
import { CountryComponent } from '../adminModule/components/country/country.component';
import { CurrencyComponent } from '../adminModule/components/currency/currency.component';
import { ProductComponent } from '../adminModule/components/product/product.component';
import { ReportsComponent } from '../adminModule/components/reports/reports.component';
import { GoldcardComponent } from '../adminModule/components/goldcard/goldcard.component';
import { RatesComponent } from '../adminModule/components/rates/rates.component';
import { ChargesComponent } from '../adminModule/components/charges/charges.component';
import { UserrolesComponent } from '../adminModule/components/userroles/userroles.component';
import { OnlineusersComponent } from '../adminModule/components/onlineusers/onlineusers.component';
import { MainMenuComponent } from '../adminModule/main-menu/main-menu.component';
import { TableComponent } from '../adminModule/components/table/table.component';
import { DailogComponent } from '../adminModule/components/dailog/dailog.component';
import { BranchusersComponent } from '../adminModule/components/branchusers/branchusers.component';
import { CurrencygroupComponent } from '../adminModule/components/currencygroup/currencygroup.component';
import { ProductgroupComponent } from '../adminModule/components/productgroup/productgroup.component';
import { CountryproductComponent } from './components/countryproduct/countryproduct.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AvatarModule } from 'ngx-avatar';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';
@NgModule({
    imports: [
        MaterialModule, CommonModule, AdminRoutingModule, FormsModule,
        ReactiveFormsModule, AvatarModule, Ng2SearchPipeModule, NgxPaginationModule, MatTooltipModule
    ],
    declarations: [BranchComponent, CountryComponent, CurrencyComponent,
        ProductComponent, ReportsComponent, GoldcardComponent, DailogComponent,
        BranchusersComponent, CurrencygroupComponent, ProductgroupComponent,
        RatesComponent, ChargesComponent, UserrolesComponent,
        OnlineusersComponent, TableComponent, MainMenuComponent, CountryproductComponent, DashboardComponent, ChangepasswordComponent
    ],
    entryComponents: [
        DailogComponent],
    providers: [AdminService, AdminGuardService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
    ]
})
export class AdminModule {

}
