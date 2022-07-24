import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { StoreGuardService } from './store.guards';
import { NationalBondComponent } from '../storeModule/components/nationalbond/nationalbond.component'
import { MainMenuComponent } from '../storeModule/main-menu/main-menu.component';
import { WesternunionComponent } from '../storeModule/components/westernunion/westernunion.component';
import { InstantcashComponent} from '../storeModule/components/instantcash/instantcash.component';
import { InstantdraftComponent } from '../storeModule/components/instantdraft/instantdraft.component';
import { ForeignexchangeComponent } from './components/foreignexchange/foreignexchange.component';
import { TelegraphtransferComponent } from './components/telegraphtransfer/telegraphtransfer.component';
import { DubaipoliceComponent } from './components/dubaipolice/dubaipolice.component';
import { ArabiaComponent } from './components/arabia/arabia.component';
import { RemittanceComponent } from './components/remittance/remittance.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ReportsComponent } from './components/reports/reports.component';

const StoreRoutes: Routes = [
  {
    path: '', component: MainMenuComponent,
    canActivate: [StoreGuardService],
    canActivateChild: [StoreGuardService],

    children: [
      {path: 'foreignexchange', component: ForeignexchangeComponent, data: {title : 'Foreign exchange'}},
        {path: 'nationalbond', component: NationalBondComponent, data: {title : 'National Bond'}},
        {path: 'instantdraft', component: InstantdraftComponent, data: {title: 'Instant Draft'}},
        {path: 'telegraphtransfer', component: TelegraphtransferComponent, data: {title: 'Telegraph Transfer'}},
        {path: 'dubaipolice', component: DubaipoliceComponent , data: {title: 'Dubai Police'}},
        {path: 'westernunion', component: WesternunionComponent, data: {title: 'Western Union'}},
        {path: 'instantcash', component: InstantcashComponent, data: {title: 'Instant Cash'}},
        {path: 'arabia', component: ArabiaComponent, data: {title: 'Airarabia'}},
        {path: 'remittance', component: RemittanceComponent, data: {title: 'Remittance'}},
        {path: 'dashboard', component: DashboardComponent, data: {title: 'Dashboard'}},
        {path: 'reports', component: ReportsComponent, data: {title: 'Reports'}},
          ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(StoreRoutes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }