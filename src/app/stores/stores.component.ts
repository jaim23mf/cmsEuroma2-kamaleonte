import { Component, QueryList, ViewChildren } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Subscription } from 'rxjs';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Semana } from '../models/semana-model';
import { Store } from '../models/store-model';
import { MsgService } from '../msg.service';
import { OphoursDialogComponent } from '../ophours-dialog/ophours-dialog.component';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css']
})
export class StoresComponent {


  subs:Subscription;

  public constructor(public dialog: MatDialog,public confirm: MatDialog, private msg_service:MsgService){
    this.subs = this.msg_service.getText().subscribe(this.fileUploaded);
  }


  @ViewChildren(MatExpansionPanel)
  panels!: QueryList<MatExpansionPanel>;

  types = new FormControl();
  category = new FormControl();
  subcategory = new FormControl();

  stores:Store[] = [{
    id:null,
    name:"NOMBRE TIENDA",
    type:null,
    category:null,
    subcategory:null,
    logo:null,
    photo:null,
    op_hours: new Semana(),
    phone:"000-000-000"
  }];

  typesList=["a","b","c","d", "e","f","g","h"];
  catList=["a1","b1","c1","d1", "e1","f1","g1","h1"];
  subList=["a2","b2","c2","d2", "e2","f2","g2","h2"];


  newEvent(){
    this.stores = [...this.stores,{
      id:null,
      name:"",
      type:null,
      category:null,
      subcategory:null,
      logo:null,
      photo:null,
      op_hours: new Semana(),
      phone:""
    }];
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

  openDialog(horas:Semana){

    const dialogRef = this.dialog.open(OphoursDialogComponent, {
      data:horas
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
