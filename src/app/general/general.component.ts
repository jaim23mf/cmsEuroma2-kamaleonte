import { Component, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { DateRange } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { delay, retry } from 'rxjs';
import { InterestService } from '../api_connection/api_interest/interest.service';
import { OpeningService } from '../api_connection/api_opening/opening.service';
import { ShopService } from '../api_connection/api_shop/shop.service';
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
  constructor(private dateAdapter: DateAdapter<Date>, public confirm: MatDialog,public shopService: ShopService , public openingService:OpeningService , public interestService:InterestService) {
    this.dateAdapter.setLocale('it-IT'); //dd/MM/yyyy
    
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

    this.openingService.putException(hora).subscribe();

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

  async newRule(){

    let elem = {
      id:0,
      dateRange:{id:0,from:"",to:""},
      food:{id:0,from:"",to:""},
      global:{id:0,from:"",to:""},
      hypermarket:{id:0,from:"",to:""},
      ourStores:{id:0,from:"",to:""}
      };

    await this.openingService.postException(elem).subscribe((data:Horario)=>{
    this.horasEspeciales = [... this.horasEspeciales,{
      id:data.id,
      dateRange:{id:data.dateRange.id,from:data.dateRange.from,to:data.dateRange.from},
      food:{id:data.food.id,from:data.food.from,to:data.food.to,fromWeekDay:data.food.fromWeekDay , toWeekDay:data.food.toWeekDay},
      global:{id:data.global.id,from:data.global.from,to:data.global.to},
      hypermarket:{id:data.hypermarket.id,from:data.hypermarket.from,to:data.hypermarket.to,fromWeekDay:data.hypermarket.fromWeekDay , toWeekDay:data.hypermarket.toWeekDay},
      ourStores:{id:data.ourStores.id,from:data.ourStores.from,to:data.ourStores.to,fromWeekDay:data.ourStores.fromWeekDay , toWeekDay:data.ourStores.toWeekDay}
      }
    ];
    });
  }

  async newCat(){
    await this.shopService.postCategory({id:0,title:"",title_it:"",shopType:0}).subscribe((data:Category)=>{
      this.category = [... this.category,{
        id:data.id,
        title: data.title,
        title_it:data.title_it|| "",
        shopType:data.shopType
      }
      ];
      this.changeCatList();
    });

  }
  async newSub(){
    await this.shopService.postSubCategory({id:0,categoryId:0,title:"",title_it:""}).subscribe((data:Subcategory) =>{
      this.subcategory = [... this.subcategory,{
        id:data.id,
        categoryId:data.categoryId,
        title: data.title,
        title_it:data.title_it || ""
      }
      ];
    })

  }

  async newInterest(){
    await this.interestService.postInterest({id:0,name:"",name_it:"",group:0}).subscribe((data:Interest) =>{
      console.log(data);
      this.interest = [... this.interest,{
        id:data.id,
        name: data.name,
        name_it:data.name_it || "",
        group:data.group
      }
      ];
    })

  }


  changeCat(cat:Category){
    this.shopService.putCategory(cat).subscribe(()=>{
      this.changeCatList();
    }); 
    
  }

  changeSubCat(cat:Subcategory){    
    this.shopService.putSubCategory(cat).subscribe();
  }

  changeInterest(i:Interest){    
    this.interestService.putInterest(i).subscribe();
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

  showDate(today:Date| undefined | string){
    
    if(today === undefined) return '';

    if(typeof today === "string"){
      today = new Date(today);
    };

    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    ​
    let salida = dd + '/' + mm + '/' + yyyy;

    return salida;
  }

}
