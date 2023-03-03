import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { DateRange } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { delay, retry } from 'rxjs';
import { InterestService } from '../api_connection/api_interest/interest.service';
import { OpeningService } from '../api_connection/api_opening/opening.service';
import { ShopService } from '../api_connection/api_shop/shop.service';
import { setLocalTime } from '../common/global-constants';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Category } from '../models/category-model';
import { Horario } from '../models/horario-model';
import { Interest } from '../models/interest.model';
import { Subcategory } from '../models/subcat-model';
import { UsersService } from '../usersService/users.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit{

  general = {
    id: 0,
    global: {
      id: 0,
      from: "string",
      to: "string"
    },
    food: {
      id: 0,
      fromWeekDay: 0,
      toWeekDay: 0,
      from: "string",
      to: "string"
    },
    hypermarket: {
      id: 0,
      fromWeekDay: 0,
      toWeekDay: 0,
      from: "string",
      to: "string"
    },
    ourStores: {
      id: 0,
      fromWeekDay: 0,
      toWeekDay: 0,
      from: "string",
      to: "string"
    }
  };

  dias = [
    {value: 0, viewValue: 'Monday'},
    {value: 1, viewValue: 'Tuesday'},
    {value: 2, viewValue: 'Wednesday'},
    {value: 3, viewValue: 'Thursday'},
    {value: 4, viewValue: 'Friday'},
    {value: 5, viewValue: 'Saturday'},
    {value: 6, viewValue: 'Sunday'},

  ];

  horasEspeciales: Horario[] =  [];
 
  group = [

    {id:1, title:"Shops"},
    {id:2, title:"Hobbies"},
    {id:3, title:"Events"}

  ];

  shopTypes = [
    {id:1, title:"Food And Beverage"},
    {id:2, title:"Store"}
  ];


  category : Category[] = [];

  subcategory : Subcategory[] = []

  interest: Interest[]=[]

  catList:Category[] = [];
  constructor(private dateAdapter: DateAdapter<Date>, public confirm: MatDialog, public erorDialog:MatDialog,public shopService: ShopService , public openingService:OpeningService , public interestService:InterestService) {
    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
    
  }

  ngOnInit(): void {


    this.shopService.getAllCategory().subscribe((data: Category[]) => {
      this.category = data;
    });    

    this.shopService.getAllSubCategory().subscribe((data: Subcategory[]) => {
      this.subcategory = data;
    });    


    this.changeCatList();

    this.openingService.getAllOpening().subscribe((data:any)=>{
      //console.log(data);
      this.general = {
        id:data[0].id,
        global:data[0].global,
        food:data[0].food,
        hypermarket:data[0].hypermarket,
        ourStores:data[0].ourStores
      };
    });

    this.openingService.getAllExceptions().subscribe((data:any) =>{
      //console.log(data);
      this.horasEspeciales = data;
    });

    this.interestService.getAllInterests().subscribe((data:any)=>{
      this.interest = data;
    });
  }

  changeGeneral(general:any){
    this.openingService.putGeneral(general).subscribe();

  }

  changeException(hora:Horario){
    /*if(hora.dateRange.from == null){hora.dateRange.from = "";}
    if(hora.dateRange.to == null){hora.dateRange.to = "";}
    this.openingService.putException(hora).subscribe();*/

  }

  async saveRule(hora:Horario){


        this.confirm
        .open(ConfirmDialogComponent, {
          data: 'You are going to save this special rule.'
        })
        .afterClosed()
        .subscribe((confirmado: Boolean) => {
          if (confirmado) {
    
        let errorSave:Boolean = false;;
        
        if(hora.dateRange.from == null){hora.dateRange.from = "";}
        else{hora.dateRange.from = setLocalTime(hora.dateRange.from);}
        if(hora.dateRange.to == null){hora.dateRange.to = "";}
        else{hora.dateRange.to = setLocalTime(hora.dateRange.to);}

        if(hora.dateRange.from == ""){errorSave =true;}
        if(!errorSave){
            if(hora.id == 0 ){

              this.openingService.postException(hora).subscribe((data:Horario)=>{
                console.log(data);
                hora.id = data.id; 
                hora.dateRange.id = data.dateRange.id;
                hora.food.id = data.food.id;
                hora.global.id = data.global.id;
                hora.hypermarket.id = data.hypermarket.id;
                hora.ourStores.id = data.ourStores.id;
              });
            }
            else{
              this.openingService.putException(hora).subscribe();
            }
        }
        else{
          this.erorDialog
        .open(ConfirmDialogComponent, {
          data: 'You need to enter all required fields.'
        })
        }
      } 
    });
  }


  changeCatList(){
    this.shopService.getAllCategory().subscribe((data: Category[]) => {
      this.catList = [];
      this.catList.push({id:0,title:"Nothing Selected",title_it:"Nothing Selected",shopType:0});
      data.forEach(element => {
        this.catList.push(element);
      });

      //console.log(this.catList);

    });    
  }

  saveCategory(cat:Category){
 
     this.confirm
    .open(ConfirmDialogComponent, {
      data: 'You are going to save this category.'
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {

    let errorSave:Boolean = false;;
    
    if(cat.title == ""){errorSave =true;}
    if(cat.title_it == ""){errorSave = true;}
    if(!errorSave){
        if(cat.id == 0 ){

          this.shopService.postCategory({id:0,title:"",title_it:"",shopType:0}).subscribe((data:Category)=>{
            cat = data;
            this.changeCatList();
          });
        }
        else{
          this.shopService.putCategory(cat).subscribe(()=>{
            this.changeCatList();
          }); 
        }
    }
    else{
      this.erorDialog
    .open(ConfirmDialogComponent, {
      data: 'You need to enter all required fields.'
    })
    }
      } 
    });

  }


  saveSubCategory(cat:Subcategory){
 
    this.confirm
   .open(ConfirmDialogComponent, {
     data: 'You are going to save this subcategory.'
   })
   .afterClosed()
   .subscribe((confirmado: Boolean) => {
     if (confirmado) {

   let errorSave:Boolean = false;;
   
   if(cat.title == ""){errorSave =true;}
   if(cat.title_it == ""){errorSave = true;}
   if(!errorSave){
       if(cat.id == 0 ){

         this.shopService.postSubCategory({id:0,categoryId:0,title:"",title_it:""}).subscribe((data:Subcategory) =>{
            cat = data;
        })
       }
       else{
         this.shopService.putSubCategory(cat).subscribe(()=>{}); 
       }
   }
   else{
     this.erorDialog
   .open(ConfirmDialogComponent, {
     data: 'You need to enter all required fields.'
   })
   }
 } 
});

 }


 saveInterest(cat:Interest){
 
  this.confirm
 .open(ConfirmDialogComponent, {
   data: 'You are going to save this interest.'
 })
 .afterClosed()
 .subscribe((confirmado: Boolean) => {
   if (confirmado) {

 let errorSave:Boolean = false;;
 
 if(cat.name == ""){errorSave =true;}
 if(cat.name_it == ""){errorSave = true;}
 if(!errorSave){
     if(cat.id == 0 ){

      this.interestService.postInterest({id:0,name:"",name_it:"",group:0}).subscribe((data:Interest) =>{
       cat = data;
      })
     }
     else{
      this.interestService.putInterest(cat).subscribe();
     }
 }
 else{
   this.erorDialog
 .open(ConfirmDialogComponent, {
   data: 'You need to enter all required fields.'
 })
 }
} 
});

}

  async newRule(){

    let elem = {
      id:0,
      dateRange:{id:0,from:"",to:""},
      food:{id:0,from:"",to:""},
      global:{id:0,from:"",to:""},
      hypermarket:{id:0,from:"",to:""},
      ourStores:{id:0,from:"",to:""}
      };

      this.horasEspeciales = [... this.horasEspeciales, elem ];

    /*await this.openingService.postException(elem).subscribe((data:Horario)=>{
    this.horasEspeciales = [... this.horasEspeciales,{
      id:data.id,
      dateRange:{id:data.dateRange.id,from:data.dateRange.from,to:data.dateRange.from},
      food:{id:data.food.id,from:data.food.from,to:data.food.to,fromWeekDay:data.food.fromWeekDay , toWeekDay:data.food.toWeekDay},
      global:{id:data.global.id,from:data.global.from,to:data.global.to},
      hypermarket:{id:data.hypermarket.id,from:data.hypermarket.from,to:data.hypermarket.to,fromWeekDay:data.hypermarket.fromWeekDay , toWeekDay:data.hypermarket.toWeekDay},
      ourStores:{id:data.ourStores.id,from:data.ourStores.from,to:data.ourStores.to,fromWeekDay:data.ourStores.fromWeekDay , toWeekDay:data.ourStores.toWeekDay}
      }
    ];
    });*/
  }

  async newCat(){

    this.category = [... this.category,{
      id:0,
      title: "",
      title_it: "",
      shopType:0
    }
    ];

    /*await this.shopService.postCategory({id:0,title:"",title_it:"",shopType:0}).subscribe((data:Category)=>{
      this.category = [... this.category,{
        id:data.id,
        title: data.title,
        title_it:data.title_it|| "",
        shopType:data.shopType
      }
      ];
      this.changeCatList();
    });*/

  }
  async newSub(){
    this.subcategory = [... this.subcategory,{
      id:0,
      categoryId:0,
      title: "",
      title_it: ""
    }
    ];
    /*await this.shopService.postSubCategory({id:0,categoryId:0,title:"",title_it:""}).subscribe((data:Subcategory) =>{
      this.subcategory = [... this.subcategory,{
        id:data.id,
        categoryId:data.categoryId,
        title: data.title,
        title_it:data.title_it || ""
      }
      ];
    })*/

  }

  async newInterest(){

    this.interest = [... this.interest,{
      id:0,
      name: "",
      name_it: "",
      group:0
    }
    ];
    /*await this.interestService.postInterest({id:0,name:"",name_it:"",group:0}).subscribe((data:Interest) =>{
      console.log(data);
      this.interest = [... this.interest,{
        id:data.id,
        name: data.name,
        name_it:data.name_it || "",
        group:data.group
      }
      ];
    })*/

  }


  changeCat(cat:Category){
    /*this.shopService.putCategory(cat).subscribe(()=>{
      this.changeCatList();
    }); */
    
  }

  changeSubCat(cat:Subcategory){    
    //this.shopService.putSubCategory(cat).subscribe();
  }

  changeInterest(i:Interest){    
    //this.interestService.putInterest(i).subscribe();
  }

  deleteRule(hora:Horario){
    this.confirm
    .open(ConfirmDialogComponent, {
      data: 'You are going to delete this special rule.'
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        this.horasEspeciales = this.horasEspeciales.filter((event) => event !== hora);
        this.openingService.deleteException(hora.id).subscribe();
      } 
    });
  }

  deleteCat(cat:Category){

    this.confirm
    .open(ConfirmDialogComponent, {
      data: 'You are going to delete this category.'
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        this.category = this.category.filter((event) => event !== cat);
        this.shopService.deleteCategory(cat.id).subscribe();
      } 
    });

  }

  deleteSub(cat:Subcategory){

    this.confirm
    .open(ConfirmDialogComponent, {
      data: 'You are going to delete this subcategory.'
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        this.subcategory = this.subcategory.filter((event) => event !== cat);
        this.shopService.deleteSubCategory(cat.id).subscribe();

      } 
    });

  }
  

  deleteInterest(cat:Interest){

    this.confirm
    .open(ConfirmDialogComponent, {
      data: 'You are going to delete this interest.'
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        this.interest = this.interest.filter((event) => event !== cat);
        this.interestService.deleteInterest(cat.id).subscribe();

      } 
    });

  }
  /*saveRules(){
    //console.log(this.horasEspeciales);
  }*/

  showDate(today:Date| undefined | string, to:Date| undefined | string){
    
    if(today === undefined) return '';

    if(typeof today === "string"){
      today = new Date(today);
    };

    ​if(Number.isNaN(today.getDate())){
      return "";
    }

    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    let salida = dd + '/' + mm + '/' + yyyy;
   
    
    //return salida;

    if(typeof to === "string"){
      to = new Date(to);
    };
    ​if(to == undefined || Number.isNaN(to.getDate())){
      return salida;
    }

    var dd2 = String(to.getDate()).padStart(2, '0');
    var mm2 = String(to.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy2 = to.getFullYear();

    salida += " - " + dd2 + '/' + mm2 + '/' + yyyy2;

    return salida;
  }

}
