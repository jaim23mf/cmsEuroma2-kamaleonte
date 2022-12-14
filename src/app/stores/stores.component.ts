import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Subscription } from 'rxjs';
import { ShopService } from '../api_connection/api_shop/shop.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Category } from '../models/category-model';
import { Opening_Day, Semana } from '../models/semana-model';
import { Store } from '../models/store-model';
import { Subcategory } from '../models/subcat-model';
import { MsgService } from '../msg.service';
import { OphoursDialogComponent } from '../ophours-dialog/ophours-dialog.component';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css']
})
export class StoresComponent implements OnInit{


  subs:Subscription;

  public constructor(public dialog: MatDialog,public confirm: MatDialog, private msg_service:MsgService , private shopService:ShopService){
    this.subs = this.msg_service.getText().subscribe(this.fileUploaded);
  }
  ngOnInit(): void {
    this.shopService.getAllShop().subscribe((data:Store[])=>{
        this.stores = data;
    });
    this.shopService.getAllCategory().subscribe((data: Category[]) => {
      this.catList = data;
    });    

    this.shopService.getAllSubCategory().subscribe((data: Subcategory[]) => {
      this.subList = data;
    });    

  }


  @ViewChildren(MatExpansionPanel)
  panels!: QueryList<MatExpansionPanel>;

  stores:Store[] = [
    {
    id: 0,
    title: "string",
    type: 0,
    categoryId: [
      {
        id: 0,
        title: "string"
      }
    ],
    subcategoryId: [
      {
        id: 0,
        title: "string"
      }
    ],
    logo: "string",
    photo: "string",
    openingHours: [
      {
        id: 0,
        description: 0,
        from: "string",
        to: "string"
      }
    ],
    phoneNumber: "string",
    description: "string",
    firstOpeningDay: "string",
    interestIds: [
      0
    ]
  }];

  typesList=["a","b","c","d", "e","f","g","h"];
  catList:Category[] = [];
  subList:Subcategory[]=[];
  
  async newEvent(){

    let shop = {
      id: 0,
      title: "",
      type: 0,
      categoryId: [ ],
      subcategoryId: [],
      logo: "",
      photo: "",
      openingHours: [],
      phoneNumber: "",
      description: "",
      firstOpeningDay: "",
      interestIds: []
    };

    await this.shopService.postShop(shop).subscribe((data:Store)=>{
    this.stores = [...this.stores,{
      id: data.id,
      title: "",
      type: data.type,
      categoryId: [ ],
      subcategoryId: [],
      logo: "",
      photo: "",
      openingHours: [],
      phoneNumber: "",
      description: "",
      firstOpeningDay: "",
      interestIds: []
    }];
  
    });
  }


  closeAllPanels() {
    this.panels.forEach(panel => {
            panel.close();
    });
  }


  openAllPanels() {
    this.panels.forEach(panel => {
            panel.open();
    });
  }

  openDialog(horas:Opening_Day[]){

    const dialogRef = this.dialog.open(OphoursDialogComponent, {
      data:horas
    });
  }


  changeStore(s:Store){
    this.shopService.putShop(s).subscribe();
  }

  deleteStore(s:Store){
    this.confirm
    .open(ConfirmDialogComponent, {
      data: 'You are going to delete this store.'
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        this.stores = this.stores.filter((event) => event !== s);
      } 
    });
  }


  fileUploaded(value:any){
    console.log(value.msg , value.type);
    
  }


  ngOnDestroy(){
    this.subs.unsubscribe();
  }

}
