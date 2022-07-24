import { Injectable } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { StoreService } from '../store.service';


@Injectable()
export class CommonfunctionsComponent {
    goldcarddetails: any = []; // getting goldcard details array
    today: any = new Date().toISOString(); // today date

    constructor(public storeservice: StoreService, public toaster: ToastrManager) { }


  async   goldcardcheck(goldcardnumber) {
        const gdata = await  this.storeservice.goldcardDetailsGetting(goldcardnumber).subscribe((data: any) => {
        this.goldcarddetails = data;
        if (this.goldcarddetails && this.goldcarddetails.gcmgcexpd <= this.today) {
            this.toaster.errorToastr('Goldcard is Expired', '', { position: 'bottom-center', maxShown: 1 });
        } else if (this.goldcarddetails && this.goldcarddetails.gcmgcstat !== 'A') {
                this.toaster.errorToastr('Goldcard is Inactive', '', { position: 'bottom-center', maxShown: 1 });
        } else if (this.goldcarddetails == null) {
                    this.toaster.errorToastr('Invalid Goldcard', '', { position: 'bottom-center', maxShown: 1 });
        } else {
                    console.log(this.goldcarddetails.length);
                    return true;
        }
    });
        console.log(gdata);
        console.log(this.goldcarddetails.length);
        return  this.goldcarddetails;
}

}
