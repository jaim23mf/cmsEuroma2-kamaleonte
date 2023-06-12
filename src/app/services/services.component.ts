import { Component, QueryList, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionPanel } from '@angular/material/expansion';
import { delay, retry, Subscription } from 'rxjs';
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
  currentItemsToShow:Servicio[]= [];
  pageSize = 10;
  pagesLength = 0;
  subs:Subscription;

  public constructor(public confirm: MatDialog, public errorDialog:MatDialog,private msg_service:MsgService , private serviceService:ServiceService){
    this.subs = this.msg_service.getText().subscribe((data:any) =>{
      let prom = this.services.find(f=>f.id == data.type); 

      if(prom){
        prom.icon = data.msg;
        this.changeService(prom);
      }
    });

    this.serviceService.getAllServices().subscribe((data:Servicio[]) => {
      this.services = data;

      this.pagesLength = this.services.length;
      this.currentItemsToShow = this.services.slice(0,this.pageSize);

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

    let serv :Servicio= 
      {
        id:0,
        icon: "",
        title: "",
        title_it:"",
        description: "",
        description_it:"",
        order:0
      }
    
      this.services = [...this.services,serv];
   /* this.serviceService.postService(serv).subscribe((data:Servicio) =>{
      this.services = [...this.services,{
        id:data.id,
        icon: data.icon,
        title: data.title,
        title_it:data.title_it || "",
        description: data.description,
        description_it:data.description_it ||"",
        order:data.order
      }];
    });*/

  }


  changeService(s:Servicio){
    if(s.description_it == null){s.description_it ="";}
    if(s.title_it == null){s.title_it ="";}
    
    //this.serviceService.putService(s).subscribe();
  }



  saveService(s:Servicio){
    if(s.description_it == null){s.description_it ="";}
    if(s.title_it == null){s.title_it ="";}
    this.confirm
   .open(ConfirmDialogComponent, {
     data: 'You are going to save this service.'
   })
   .afterClosed()
   .subscribe((confirmado: Boolean) => {
     if (confirmado) {

   let errorSave:Boolean = false;;
   
   if(s.title == ""){errorSave =true;}
   if(s.title_it == ""){errorSave = true;}
   if(!errorSave){
       if(s.id == 0 ){

        this.serviceService.postService(s).subscribe((data:Servicio) =>{
           s = data;
         });
       }
       else{
        this.serviceService.putService(s).subscribe();
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


  onPageChange($event: { pageIndex: number; pageSize: number; }) {
    this.pageSize = $event.pageSize;
    this.currentItemsToShow =  this.services.slice($event.pageIndex*$event.pageSize, $event.pageIndex*$event.pageSize + $event.pageSize);
  }
  
  search(text:string){
    let filter:Servicio[] = this.services.filter(elem => elem.title.toLowerCase().includes(text.toLowerCase()));
    this.currentItemsToShow = filter.slice(0,this.pageSize);
    this.pagesLength = filter.length;
  
  }   
  ngOnDestroy(){
    this.subs.unsubscribe();
  }

}
