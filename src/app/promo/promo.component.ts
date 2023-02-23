import { Component, QueryList, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionPanel } from '@angular/material/expansion';
import { delay, retry, Subscription } from 'rxjs';
import { InterestService } from '../api_connection/api_interest/interest.service';
import { PromoService } from '../api_connection/api_promo/promo.service';
import { ShopService } from '../api_connection/api_shop/shop.service';
import { GlobalConstants } from '../common/global-constants';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { SelectModel } from '../models/global-model';
import { Interest, LineaInteres_promo } from '../models/interest.model';
import { Promo } from '../models/promo-model';
import { Store } from '../models/store-model';
import { MsgService } from '../msg.service';

@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
  styleUrls: ['./promo.component.css']
})
export class PromoComponent {
  
  subs:Subscription;

  public constructor(public confirm: MatDialog,public errorDialog: MatDialog,  private msg_service:MsgService ,
  private promosService:PromoService , private shopService:ShopService , private interestService:InterestService)
  {
    this.subs = this.msg_service.getText().subscribe((data:any) =>{
      let prom = this.promociones.find(f=>f.id == data.type); 

      if(prom){
        prom.image = data.msg;
        this.changePromo(prom);
      }

    });
    
    this.shopService.getAllShop().subscribe((data:Store[])=>{
        data.forEach(element => {
          this.stores.push({value:element.id , viewValue: element.title});
        });

    });

    this.interestService.getAllInterests().subscribe((data:Interest[]) =>{
      this.interestList=data;
    });

    this.promosService.getAllPromo().subscribe((data:Promo[])=>{
      this.promociones = data;

      this.promociones.forEach(s => {
        s.iiId = [];
        s.interestIds?.forEach(i => {
           s.iiId?.push(i.id_interest);
        });
      });

      //console.log(this.promociones);

    });
  }



  @ViewChildren(MatExpansionPanel)
  panels!: QueryList<MatExpansionPanel>;

  promociones:Promo[] = [];

  interestList:Interest[] =[];
  stores:SelectModel[] = [];


  async newPromo(){
    let promo = {
      id: 0,
      shopId: 0,
      dateRange:{id:0,from:"",to:""},
      title: "",
      title_it: "",
      image: "",
      description: "",
      description_it: "",
      interestIds: []
    };
    this.promociones = [...this.promociones,promo];
    /*await this.promosService.postPromo(promo).subscribe((data:Promo)=>{

      this.promociones = [...this.promociones,{
        id:data.id,
        title: "",
        title_it: "",
        dateRange:{id:0,from:"",to:""},
        description:"",
        description_it: "",
        shopId: 0,
        image:"",
        interestIds:[]
      }];
  
    });*/
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

  deletePromo(p:Promo){
    this.confirm
    .open(ConfirmDialogComponent, {
      data: 'You are going to delete this promo.'
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        this.promociones = this.promociones.filter((event) => event !== p);
        this.promosService.deletePromo(p).subscribe();
      } 
    });
    
  }

  getName(name:any){
    if(name){
      let n = name.split("\\");
      return n[n.length-1];
    }
  }

  changePromo(p:Promo){

    /*if(p.iiId != null){
     
      let realInterest:LineaInteres_promo[] = [];
       p.iiId.forEach(element => {
         realInterest.push({id:0,id_interest:element,id_promo:p.id?p.id:0});
     });

     p.interestIds = realInterest;

    }*/
    if(p.description == null) {p.description="";}
    if(p.description_it == null) {p.description_it="";}
    if(p.title_it == null) {p.title_it="";}
    if(p.dateRange.from == null){p.dateRange.from = "";}
    if(p.dateRange.to == null){p.dateRange.to = "";}
    //this.promosService.putPromo(p).subscribe();

  }


  savePromo(p:Promo){
 
    if(p.description == null) {p.description="";}
    if(p.description_it == null) {p.description_it="";}
    if(p.title_it == null) {p.title_it="";}
    if(p.dateRange.from == null){p.dateRange.from = "";}
    if(p.dateRange.to == null){p.dateRange.to = "";}

    this.confirm
   .open(ConfirmDialogComponent, {
     data: 'You are going to save this promotion.'
   })
   .afterClosed()
   .subscribe((confirmado: Boolean) => {
     if (confirmado) {

   let errorSave:Boolean = false;;
   
   if(p.title == "") {errorSave=true;}
   if(p.title_it == "") {errorSave=true;}
   if(p.dateRange.from == ""){errorSave=true;}
   if(p.dateRange.to == ""){errorSave=true;}
   if(p.shopId == 0 ){errorSave=true;}
   if(!errorSave){
       if(p.id == 0 ){

        this.promosService.postPromo(p).subscribe((data:Promo)=>{
           p = data;
           p.dateRange.id = data.dateRange.id;
         });
       }
       else{
        if(p.iiId != null){
     
          let realInterest:LineaInteres_promo[] = [];
           p.iiId.forEach(element => {
             realInterest.push({id:0,id_interest:element,id_promo:p.id?p.id:0});
         });
         p.interestIds = realInterest;
        }
        this.promosService.putPromo(p).subscribe();
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



  ngOnDestroy(){
    this.subs.unsubscribe();
  }

}
