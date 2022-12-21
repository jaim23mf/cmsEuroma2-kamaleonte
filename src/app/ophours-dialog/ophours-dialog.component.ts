import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { delay, retry } from 'rxjs';
import { ShopService } from '../api_connection/api_shop/shop.service';
import { Opening_Day } from '../models/semana-model';
import { Store } from '../models/store-model';
import { StoresComponent } from '../stores/stores.component';

@Component({
  selector: 'app-ophours-dialog',
  templateUrl: './ophours-dialog.component.html',
  styleUrls: ['./ophours-dialog.component.css']
})
export class OphoursDialogComponent {


  constructor(@Inject(MAT_DIALOG_DATA) public store:Store  , private dialogRef: MatDialogRef<OphoursDialogComponent> , private shopService:ShopService) {

    this.data=store.openingHours;
    console.log(this.data);
    while(this.data.length<7){
      this.data.push({
        id:0,
        from:"00:00",
        to:"00:00",
        description:this.data.length,
        id_shop:store.id
      });
    }
    dialogRef.disableClose = true;
  }

  data:Opening_Day[]=[];

  change(data:Opening_Day[]){
    this.store.openingHours = data;
    this.shopService.putShop(this.store).pipe(retry(3), delay(1000)).subscribe();

  }

  closeDialog(){
    this.dialogRef.close();
  }

}
