import { Component, QueryList, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Subscription } from 'rxjs';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Servicio } from '../models/servicio-model';
import { MsgService } from '../msg.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent {

  subs:Subscription;

  public constructor(public confirm: MatDialog, private msg_service:MsgService){
    this.subs = this.msg_service.getText().subscribe(this.fileUploaded);
  }
  
  @ViewChildren(MatExpansionPanel)
  panels!: QueryList<MatExpansionPanel>;

  services:Servicio[]=[{
    id:null,
    icon: null,
    title: "Servicio...",
    description: "Una descripcion del servicio",
    order:null
  }]

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

  newService(){
    this.services = [...this.services,{
      id:null,
      icon: null,
      title: "",
      description: "",
      order:null
    }]

  }

  deleteService(s:Servicio){
    this.confirm
    .open(ConfirmDialogComponent, {
      data: 'You are going to delete this service.'
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        this.services = this.services.filter((event) => event !== s);
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
