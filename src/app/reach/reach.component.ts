import { Component, QueryList, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Subscription } from 'rxjs';
import { ReachService } from '../api_connection/api_reach/reach.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Reach } from '../models/reach-model';
import { MsgService } from '../msg.service';

@Component({
  selector: 'app-reach',
  templateUrl: './reach.component.html',
  styleUrls: ['./reach.component.css']
})
export class ReachComponent {
  subs:Subscription;

  public constructor(public confirm: MatDialog, private msg_service:MsgService , private serviceService:ReachService){
    this.subs = this.msg_service.getText().subscribe(this.fileUploaded);

    this.serviceService.getAllReach().subscribe((data:Reach[]) => {
      this.services = data;
    });

  }
  
  @ViewChildren(MatExpansionPanel)
  panels!: QueryList<MatExpansionPanel>;

  services:Reach[]=[]

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

    let serv :Reach= 
      {
        id:0,
        icon: "",
        title: "",
        description: "",
        order:0
      }
    
    this.serviceService.postReach(serv).subscribe((data:Reach) =>{
      this.services = [...this.services,{
        id:data.id,
        icon: data.icon,
        title: data.title,
        description: data.description,
        order:data.order
      }];
    });

  }


  changeService(s:Reach){
    this.serviceService.putReach(s).subscribe();
  }

  deleteService(s:Reach){
    this.confirm
    .open(ConfirmDialogComponent, {
      data: 'You are going to delete this service.'
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        this.services = this.services.filter((event) => event !== s);
        this.serviceService.deleteReach(s.id).subscribe();
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
