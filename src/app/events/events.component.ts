import { Component, QueryList, ViewChildren } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Subscription } from 'rxjs';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Evento } from '../models/evento-model';
import { MsgService } from '../msg.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent {
  subs:Subscription;

  public constructor(public confirm: MatDialog, private msg_service:MsgService){
    this.subs = this.msg_service.getText().subscribe(this.fileUploaded);
  }

  @ViewChildren(MatExpansionPanel)
  panels!: QueryList<MatExpansionPanel>;

  category = new FormControl();


  events:Evento[] = [{
    id:0,
    titulo: "EVENT!!!! ",
    diaInicio:new Date(),
    diaFin:new Date(),
    descripcion:"Description of the promo.....",
    categoria: "Category"
  }];

  catList=["a1","b1","c1","d1", "e1","f1","g1","h1"];

  newEvent(){
    this.events = [...this.events,{
      id: null,
      titulo: "",
      diaInicio:null,
      diaFin:null,
      descripcion:"",
      categoria: ""
    }]
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

  deleteEvent(e:Evento){
    this.confirm
    .open(ConfirmDialogComponent, {
      data: 'You are going to delete this event.'
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        this.events = this.events.filter((event) => event !== e);
      } 
    });
  }

  fileUploaded(value:any){
    console.log(value.msg);
    
  }

  ngOnDestroy(){
    this.subs.unsubscribe();
  }

}
