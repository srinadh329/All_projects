import { Component, OnInit } from '@angular/core';
import { AdminService } from './services/admin.service';
import { ClientSideService } from './services/client-side.service';
import { RewardmgtService } from './services/rewardmgt.service';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'RewardMgt';
  propertyId: any;


  constructor(private storage: StorageService, private reward: RewardmgtService, private clientSide: ClientSideService
    , private admin: AdminService) { }
    
  ngOnInit(): void {
    this.propertyId = this.storage.getPropertyId();
    if (this.propertyId)
      this.getBuildingAmount(this.propertyId);

    if (this.clientSide.checkPlatformBrowser()) {
      this.admin.getBuildingList();
    }
  }

  getBuildingAmount(id: any) {
    this.reward.getBuildingAmount(id);
  }

}
