import { Component, QueryList, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Subscription } from 'rxjs';
import { ServiceService } from '../api_connection/api_service/service.service';
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

  public constructor(public confirm: MatDialog, private msg_service:MsgService , private serviceService:ServiceService){
    this.subs = this.msg_service.getText().subscribe(this.fileUploaded);

    this.serviceService.getAllServices().subscribe((data:Servicio[]) => {
      this.services = data;
    });

  }
  
  @ViewChildren(MatExpansionPanel)
  panels!: QueryList<MatExpansionPanel>;

  services:Servicio[]=[]

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

    let serv :Servicio= 
      {
        id:0,
        icon: "",
        title: "",
        description: "",
        order:0
      }
    
    this.serviceService.postService(serv).subscribe((data:Servicio) =>{
      this.services = [...this.services,{
        id:data.id,
        icon: data.icon,
        title: data.title,
        description: data.description,
        order:data.order
      }];
    });

  }


  changeService(s:Servicio){
    this.serviceService.putService(s).subscribe();
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
        this.serviceService.deleteService(s.id).subscribe();
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
