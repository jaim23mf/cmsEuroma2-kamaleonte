import { Component, QueryList, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Subscription } from 'rxjs';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Promo } from '../models/promo-model';
import { MsgService } from '../msg.service';

@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
  styleUrls: ['./promo.component.css']
})
export class PromoComponent {
  
  subs:Subscription;

  public constructor(public confirm: MatDialog, private msg_service:MsgService){
    this.subs = this.msg_service.getText().subscribe(this.fileUploaded);
  }

  @ViewChildren(MatExpansionPanel)
  panels!: QueryList<MatExpansionPanel>;

  promociones:Promo[] = [{
    id:null,
    titulo: "3x2",
    diaInicio:new Date(),
    diaFin:new Date(),
    descripcion:"Description of the promo.....",
    store: "Carrefour"
  }];


  stores = [
    {value: 'id1', viewValue: 'Tienda1'},
    {value: 'id2', viewValue: 'Tienda2'},
    {value: 'id3', viewValue: 'Tienda3'},
    {value: 'id4', viewValue: 'Tienda4'},
  ];


  newPromo(){
    this.promociones = [...this.promociones,{
      id:null,
      titulo: "",
      diaInicio:null,
      diaFin:null,
      descripcion:"",
      store: ""
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

  deletePromo(p:Promo){
    this.confirm
    .open(ConfirmDialogComponent, {
      data: 'You are going to delete this promo.'
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        this.promociones = this.promociones.filter((event) => event !== p);
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
