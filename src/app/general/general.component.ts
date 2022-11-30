import { Component } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Category } from '../models/category-model';
import { Horario } from '../models/horario-model';
import { Subcategory } from '../models/subcat-model';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent {


inicio  ={
    global:'10:00',
    food:'',
    market:'',
    store:''
};

fin  ={
  global:'00:00',
  food:'',
  market:'',
  store:''
};

  tipos = [
    {value: 'global', viewValue: 'Global'},
    {value: 'food', viewValue: 'Food Court'},
    {value: 'market', viewValue: 'Hipermarket'},
    {value: 'stores', viewValue: 'Our Stores'},
  ];

  horasEspeciales: Horario[] =  [
    {
      id:null,
      tipo:"global",
      diaInicio:new Date(),
      horaInicio: new Date().getHours().toString() +":"+new Date().getMinutes().toString(),
      horaFin:new Date().getHours().toString() +":"+new Date().getMinutes().toString()
    }
  ];


  category : Category[] = [
    {id:1, title:"Cat 1"},
    {id:2, title:"Cat 2"},
    {id:3, title:"Cat 3"},
    {id:4, title:"Cat 4"}
  ];

  subcategory : Subcategory[] = [
    {id:1, title:"SCat 1"},
    {id:2, title:"SCat 2"},
    {id:3, title:"SCat 3"},
    {id:4, title:"SCat 4"}
  ]


  constructor(private dateAdapter: DateAdapter<Date>, public confirm: MatDialog) {
    this.dateAdapter.setLocale('it-IT'); //dd/MM/yyyy

}

onChange(hora:Horario){

  //console.log(hora);
}


  newRule(){

    this.horasEspeciales = [... this.horasEspeciales,{
      id:null,
      tipo:null,
      diaInicio: new Date(),
      horaInicio:null,
      horaFin:null
      }
    ];
  }

  newCat(){
    this.category = [... this.category,{
      id:null,
      title: ""
    }
    ];
  }
  newSub(){
    this.subcategory = [... this.subcategory,{
      id:null,
      title: ""
    }
    ];
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
      } 
    });

  }
  
  saveRules(){
    console.log(this.horasEspeciales);
  }

  showDate(today:Date| undefined){
    
    if(today === undefined) return '';

    var dd = String(today. getDate()). padStart(2, '0');
    var mm = String(today. getMonth() + 1). padStart(2, '0'); //January is 0!
    var yyyy = today. getFullYear();
    ​
    let salida = dd + '-' + mm + '-' + yyyy;

    return salida;
  }

}
