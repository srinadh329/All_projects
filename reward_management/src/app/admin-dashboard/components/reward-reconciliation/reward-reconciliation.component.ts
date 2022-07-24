import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminService } from 'src/app/services/admin.service';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable'
import html2canvas from 'html2canvas';
// declare var jsPDF: any;

@Component({
  selector: 'app-reward-reconciliation',
  templateUrl: './reward-reconciliation.component.html',
  styleUrls: ['./reward-reconciliation.component.scss']
})
export class RewardReconciliationComponent implements OnInit {

  userList: any = [];
  userCount = 0;
  lastUserCount = 0;
  listView: any = [];
  selectedBuildingAmount: any = null;
  conciliationObj: any = {}

  filterBy: any = {
    start: this.lastUserCount,
    count: 9
  }
  buidlingList: any;

  constructor(private spinner: NgxSpinnerService, private admin: AdminService) { }

  ngOnInit(): void {
    this.getReconciliationData();
    this.admin.buildingList.subscribe((data) => {
      if (data) {
        this.buidlingList = data;
      }
    })
  }

  totalAmountLoaded: any;
  totalRewardsRedeemed: any;
  totalAvailableBalance: any;

  getReconciliationData() {
    this.spinner.show();
    this.admin.getReconciliation(this.filterBy).subscribe((data: any) => {
      if (data) {
        this.conciliationObj = data;
      }
      if (data.propertyTotalAmounts) {
        this.selectedBuildingAmount = data.propertyTotalAmounts
        this.totalAmountLoaded = data.propertyTotalAmounts.totalAmountLoaded;
        this.totalRewardsRedeemed = data.propertyTotalAmounts.totalRewardsRedeemed;
        this.totalAvailableBalance = data.propertyTotalAmounts.totalAvailableBalance
      }
      else {
        this.selectedBuildingAmount = null;
      }
      if (data && data?.userRewards) {
        this.spinner.hide();
        this.updateList(data?.userRewards);
        this.userList = this.getLastViewedUserList();
      }
      else {
        this.spinner.hide();
      }
    })
  }

  getLastViewedUserList() {
    return this.listView;
  }

  updateList(obj: any) {
    let isResult = false;
    if (obj && obj.length) {
      this.listView.push(...obj);
      isResult = true;
    }

    if (isResult == true) {
      this.lastUserCount += 9;
      this.filterBy.start = this.lastUserCount
    }

  }

  resetList() {
    this.userList = [];
    this.userCount = 0;
    this.lastUserCount = 0;
    this.listView = [];
    this.filterBy.start = this.lastUserCount;
  }


  appliedFilter(event: any) {
    if (event) {
      this.resetList();
      this.filterBy = { ...this.filterBy, ...event }
      // if (this.filterBy && this.filterBy.propertyId) {
      //   this.getClaimData(this.filterBy.propertyId, null)
      // }
      this.getReconciliationData();
    }
  }

  onScroll() {
    if (this.userCount != this.lastUserCount) {
      this.spinner.show();
      this.admin.getReconciliation(this.filterBy).subscribe((data: any) => {
        this.spinner.hide();
        if (data && data?.userRewards) {
          this.updateList(data.userRewards);
        }

      })
      this.userList = this.getLastViewedUserList();
      this.userCount = this.lastUserCount;
    }
  }

  async exportPdf() {
    const doc = new jsPDF('p', 'mm', 'a4');
    let data = document.getElementById('text-input') as any;
    let buidlingData = document.getElementById('builing-amt') as any;
    const divHeight = data.clientHeight
    const divWidth = data.clientWidth
    const ratio = divHeight / divWidth;
    const block_total = await html2canvas(data, { width: data.clientWidth, height: data.clientHeight });
    const block_canvas = block_total.toDataURL('image/png');
    doc.addImage(block_canvas, 'PNG', 0, 0, 205, 60);
    if (buidlingData) {
      const building_block = await html2canvas(buidlingData, { width: data.clientWidth, height: data.clientHeight });
      const building_block_canvas = building_block.toDataURL('image/png');
      doc.addImage(building_block_canvas, 'PNG', 0, 65, 210, 60);
    }
    if (this.filterBy && (this.filterBy.propertyId || this.filterBy.startDate)) {
      autoTable(doc, {
        styles: { fillColor: [255, 255, 255] },
        columnStyles: { 0: { halign: 'center' }, 1: { halign: 'center' } },
        body: [this.getSelectedFilters()],
        startY: 50,
        margin: { horizontal: 5 }
      })
    }
    autoTable(doc, {
      html: '#my-table',
      startY: buidlingData ? 100 : 60, margin: { horizontal: 5 }, rowPageBreak: 'avoid',
      tableWidth: 'auto'
    })
    doc.save('Reconciliation.pdf');
  }

  getSelectedFilters(): Array<any> {
    const filter: any = [];
    if (this.filterBy && this.filterBy.propertyId) {
      const obj = this.buidlingList.find((item: any) => item.id == this.filterBy.propertyId);
      if (obj) {
        filter.push(`Building Name : ${obj.name}`)
      }
    }
    if (this.filterBy && this.filterBy.startDate && this.filterBy.endDate) {
      filter.push(`Date Range : ${this.filterBy.startDate} ${this.filterBy.endDate}`)
    }
    return filter;
  }

  reClaimAmount() {
    const propertyId = this.filterBy.propertyId ? this.filterBy.propertyId : null;
    if (propertyId) {
      this.spinner.show();
      this.admin.reClaimAmount(propertyId).subscribe((data) => {
        if (data) {
          this.spinner.hide();
          this.resetList();
          this.getReconciliationData();
        }
      })
    }
  }

  getClaimData(id: any, isReClaimed: any = null) {
    this.admin.getClaimAmount(id).subscribe((data) => {
      if (data) {
        if (isReClaimed) this.getReconciliationData();
      }
    })
  }
}

