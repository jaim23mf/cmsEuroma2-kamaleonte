import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Subscription } from 'rxjs';
import { InterestService } from '../api_connection/api_interest/interest.service';
import { ShopService } from '../api_connection/api_shop/shop.service';
import { setLocalTime } from '../common/global-constants';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Category } from '../models/category-model';
import { Interest, LineaInteres_shop } from '../models/interest.model';
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

  public constructor(private dateAdapter: DateAdapter<Date>,public dialog: MatDialog,public confirm: MatDialog,public errorDialog: MatDialog, private msg_service:MsgService , private shopService:ShopService , private interestService:InterestService){
    this.subs = this.msg_service.getText().subscribe((data:any) =>{
      this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy

      let prom = this.stores.find(f=>f.id == data.type); 
      //console.log(data.tipo);
      if(prom){
      
        if(data.tipo == 0){
          prom.logo = data.msg;

        }
        else {
          prom.photo = data.msg;
        }
        this.changeStore(prom);

      }
    });
  }
  ngOnInit(): void {
    this.shopService.getAllShop().subscribe((data:Store[])=>{
        this.stores = data;
        console.log(data);
        this.stores.forEach(s => {
          s.iiId = [];
          s.interestIds.forEach(i => {
             s.iiId?.push(i.id_interest);
          });
        });

        //console.log(this.stores);
    });
    this.shopService.getAllCategory().subscribe((data: Category[]) => {
      this.catList.push({id:0,title:"Nothing Selected",title_it:"",shopType:0});
      data.forEach(element => {
        this.catList.push(element);
      });
    });    

    this.shopService.getAllSubCategory().subscribe((data: Subcategory[]) => {
      this.subList.push({id:0,categoryId:0,title:"Nothing Selected",title_it:""});
      data.forEach(element => {
        this.subList.push(element);
      });
    });    

    this.interestService.getAllInterests().subscribe((data:Interest[]) =>{
      this.interestList=data;
    });

  }


  @ViewChildren(MatExpansionPanel)
  panels!: QueryList<MatExpansionPanel>;

  stores:Store[] = [];
  categoryId:Number[]=[];
  subcategoryId:Number[]=[];
  catList:Category[] = [];
  subList:Subcategory[]=[];
  interestList:Interest[] =[];
  
  async newEvent(){

    let oph:Opening_Day[] = []
    while(oph.length<7){
      oph.push({
        id:0,
        from:"00:00",
        to:"00:00",
        description:oph.length,
      });
    }

    let shop = {
      id: 0,
      title: "",
      title_it:"",
      type: 0,
      categoryId: 0,
      subcategoryId:0,
      logo: "",
      photo: "",
      openingHours: oph,
      phoneNumber: "",
      description: "",
      desciption_it:"",
      firstOpeningDay: "",
      interestIds: []
    };

    this.stores = [...this.stores, shop];

    /*await this.shopService.postShop(shop).subscribe((data:Store)=>{
      let oph:Opening_Day[] = []
      console.log(data);
      let i = 0;
      while(data.openingHours.length<7){
        oph.push({
          id:data.openingHours[i].id,
          from:data.openingHours[i].from,
          to:data.openingHours[i].to,
          description:data.openingHours[i].description,
          id_shop:data.openingHours[i].id_shop
        });
        i++;
      }

    this.stores = [...this.stores,{
      id: data.id,
      title: "",
      title_it:"",
      type: data.type,
      categoryId: 0,
      subcategoryId: 0,
      logo: "",
      photo: "",
      openingHours: oph,
      phoneNumber: "",
      description: "",
      description_it :"",
      firstOpeningDay: "",
      interestIds: []
    }];
  
    });*/
  }


  closeAllPanels() {
    this.panels.forEach(panel => {
            panel.close();
    });
  }

  getName(name:any){
    if(name){
      let n = name.split("\\");
      return n[n.length-1];
    }
  }


  openAllPanels() {
    this.panels.forEach(panel => {
            panel.open();
    });
  }

  openDialog(horas:Store){

    const dialogRef = this.dialog.open(OphoursDialogComponent, {
      data:horas
    });
  }

  changeStore(s:Store){
    
    /*if(s.iiId != null){
     
      let realInterest:LineaInteres_shop[] = [];
       s.iiId.forEach(element => {
         realInterest.push({id:0,id_interest:element,id_shop:s.id});
     });

     s.interestIds = realInterest;

    }
*/
    if(s.title_it == null){s.title_it ="";}
    if(s.description_it == null) {s.description_it ="";}
    if(s.firstOpeningDay == null) {s.firstOpeningDay ="";}
    else{s.firstOpeningDay = setLocalTime(s.firstOpeningDay);}
    //this.shopService.putShop(s).subscribe();

  }


  saveStore(s:Store){
 
    if(s.title_it == null){s.title_it ="";}
    if(s.description_it == null) {s.description_it ="";}
    if(s.firstOpeningDay == null) {s.firstOpeningDay ="";}

    this.confirm
   .open(ConfirmDialogComponent, {
     data: 'You are going to save this store.'
   })
   .afterClosed()
   .subscribe((confirmado: Boolean) => {
     if (confirmado) {

   let errorSave:Boolean = false;;
   
   if(s.title == ""){errorSave =true;}
   if(s.title_it == ""){errorSave = true;}
   if(s.firstOpeningDay == ""){errorSave = true;}
   if(!errorSave){
       if(s.id == 0 ){

        this.shopService.postShop(s).subscribe((data:Store)=>{
          let oph:Opening_Day[] = []
          console.log(data);
          let i = 0;
          while(data.openingHours.length<7){
            oph.push({
              id:data.openingHours[i].id,
              from:data.openingHours[i].from,
              to:data.openingHours[i].to,
              description:data.openingHours[i].description,
              id_shop:data.openingHours[i].id_shop
            });
            i++;
          }
          s.id = data.id; 
          s.openingHours = oph;
        /*this.stores = [...this.stores,{
          id: data.id,
          title: "",
          title_it:"",
          type: data.type,
          categoryId: 0,
          subcategoryId: 0,
          logo: "",
          photo: "",
          openingHours: oph,
          phoneNumber: "",
          description: "",
          description_it :"",
          firstOpeningDay: "",
          interestIds: []
        }];*/
      
        });
       }
       else{
        if(s.iiId != null){
     
          let realInterest:LineaInteres_shop[] = [];
           s.iiId.forEach(element => {
             realInterest.push({id:0,id_interest:element,id_shop:s.id});
         });
    
         s.interestIds = realInterest;
    
        }

        this.shopService.putShop(s).subscribe();

       }
   }
   else{
     this.errorDialog
   .open(ConfirmDialogComponent, {
     data: 'You need to enter all required fields.'
   })
   }
     } 
   });

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
        //console.log(s.id);
        this.shopService.deleteShop(s.id).subscribe();
      } 
    });
  }


  fileUploaded(value:any){
    //console.log(value.msg , value.type);
    
  }


  ngOnDestroy(){
    this.subs.unsubscribe();
  }

}
