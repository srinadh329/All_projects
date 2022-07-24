import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdminGuardService } from './admin.guards';
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
import { BranchusersComponent } from '../adminModule/components/branchusers/branchusers.component';
import { CurrencygroupComponent } from '../adminModule/components/currencygroup/currencygroup.component';
import { ProductgroupComponent } from '../adminModule/components/productgroup/productgroup.component';
import { CountryproductComponent } from './components/countryproduct/countryproduct.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';

const AdminRoutes: Routes = [
  {
    path: '', component: MainMenuComponent,
    canActivate: [AdminGuardService],
    canActivateChild: [AdminGuardService],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'branch', component: BranchComponent },
      { path: 'branchusers', component: BranchusersComponent },
      { path: 'country', component: CountryComponent },
      { path: 'currency', component: CurrencyComponent },
      { path: 'currencylist', component: CurrencygroupComponent },
      { path: 'product', component: ProductComponent },
      { path: 'productgroup', component: ProductgroupComponent },
      { path: 'reports', component: ReportsComponent },
      { path: 'onlusrreports', component: ReportsComponent },
      { path: 'brnwisetransactions', component: ReportsComponent },
      { path: 'prdwisetransactions', component: ReportsComponent },
      { path: 'brnusrwisetransactions', component: ReportsComponent },
      { path: 'brnusrreports', component: ReportsComponent },
      { path: 'goldcard', component: GoldcardComponent },
      { path: 'rates', component: RatesComponent },
      { path: 'charges', component: ChargesComponent },
      { path: 'userroles', component: UserrolesComponent },
      { path: 'onilneusers', component: OnlineusersComponent },
      { path: 'cntprd', component: CountryproductComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'prdcnt', component: CountryproductComponent },
      { path: 'changepassword', component: ChangepasswordComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(AdminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
