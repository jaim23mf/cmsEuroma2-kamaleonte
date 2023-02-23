import { Component, QueryList, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionPanel } from '@angular/material/expansion';
import { delay, retry, Subscription } from 'rxjs';
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

  public constructor(public confirm: MatDialog, public errorDialog: MatDialog, private msg_service:MsgService , private serviceService:ReachService){
    this.subs = this.msg_service.getText().subscribe((data:any)=>{
      let prom = this.services.find(f=>f.id == data.type); 

      if(prom){
        prom.icon = data.msg;
        this.changeService(prom);
      }
    });

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

  getName(name:any){
    if(name){
      let n = name.split("\\");
      return n[n.length-1];
    }
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
        icon: " ",
        title: " ",
        title_it: " ",
        description: " ",
        description_it:" ",
        order:0
      }
    

      this.services = [...this.services,serv];

    /*this.serviceService.postReach(serv).subscribe((data:Reach) =>{
      this.services = [...this.services,{
        id:data.id,
        icon: data.icon,
        title: data.title,
        title_it: data.title_it ||" ",
        description: data.description,
        description_it: data.description_it|| " ",
        order:data.order
      }];
    });*/

  }


  changeService(s:Reach){
    if(s.description_it == null) {s.description_it="";}
    
    if(s.title_it == null) {s.title_it="";}

    //this.serviceService.putReach(s).subscribe();
  }


  saveReach(s:Reach){
 
    this.confirm
   .open(ConfirmDialogComponent, {
     data: 'You are going to save this reach us.'
   })
   .afterClosed()
   .subscribe((confirmado: Boolean) => {
     if (confirmado) {

   let errorSave:Boolean = false;;
   
   if(s.title == ""){errorSave =true;}
   if(s.title_it == ""){errorSave = true;}
   if(!errorSave){
       if(s.id == 0 ){

        this.serviceService.postReach(s).subscribe((data:Reach) =>{
           s = data;
         });
       }
       else{
        this.serviceService.putReach(s).subscribe();
       }
   }
   else{
     this.errorDialog
   .open(ConfirmDialogComponent, {
     data: 'You need to enter all required fields.'
   })
   }
     } 
   });

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




  ngOnDestroy(){
    this.subs.unsubscribe();
  }
}
