import { Component, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { DateRange } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { OpeningService } from '../api_connection/api_opening/opening.service';
import { ShopService } from '../api_connection/api_shop/shop.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Category } from '../models/category-model';
import { Horario } from '../models/horario-model';
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


  category : Category[] = [];

  subcategory : Subcategory[] = []


  constructor(private dateAdapter: DateAdapter<Date>, public confirm: MatDialog,public shopService: ShopService , public openingService:OpeningService) {
    this.dateAdapter.setLocale('it-IT'); //dd/MM/yyyy
  }

  ngOnInit(): void {
    this.shopService.getAllCategory().subscribe((data: Category[]) => {
      this.category = data;
    });    

    this.shopService.getAllSubCategory().subscribe((data: Subcategory[]) => {
      this.subcategory = data;
    });    

    this.openingService.getAllOpening().subscribe((data:any)=>{
      console.log(data);
      this.general = {
        id:data[0].id,
        global:data[0].global,
        food:data[0].food,
        hypermarket:data[0].hypermarket,
        ourStores:data[0].ourStores
      };
    });

    this.openingService.getAllExceptions().subscribe((data:any) =>{
      console.log(data);
      this.horasEspeciales = data;
    });

  }

  changeGeneral(general:any){
    this.openingService.putGeneral(general).subscribe();

  }

  changeException(hora:Horario){

    this.openingService.putException(hora).subscribe();

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
    await this.shopService.postCategory({id:0,title:""}).subscribe((data:Category)=>{
      this.category = [... this.category,{
        id:data.id,
        title: data.title
      }
      ];
    });

  }
  async newSub(){
    await this.shopService.postSubCategory({id:0,title:""}).subscribe((data:Subcategory) =>{
      this.subcategory = [... this.subcategory,{
        id:data.id,
        title: data.title
      }
      ];
    })

  }

  changeCat(cat:Category){
    this.shopService.putCategory(cat).subscribe(); 
  }

  changeSubCat(cat:Subcategory){    
    this.shopService.putSubCategory(cat).subscribe();
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
  
  /*saveRules(){
    console.log(this.horasEspeciales);
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
