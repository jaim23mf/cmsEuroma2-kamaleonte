import { Component, QueryList, ViewChildren } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Subscription } from 'rxjs';
import { EventsService } from '../api_connection/api_events/events.service';
import { InterestService } from '../api_connection/api_interest/interest.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Evento } from '../models/evento-model';
import { Interest, LineaInteres_event } from '../models/interest.model';
import { MsgService } from '../msg.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent {
  subs:Subscription;

  public constructor(public confirm: MatDialog, private msg_service:MsgService, private interestService:InterestService, private eventService: EventsService){
    this.subs = this.msg_service.getText().subscribe((data:any)=>{
      let prom = this.events.find(f=>f.id == data.type); 

      if(prom){
        prom.image = data.msg;
        this.changeEvent(prom);
      }

    });


    this.interestService.getAllInterests().subscribe((data:Interest[]) =>{
      this.interestList=data;
    });

    this.eventService.getAllEvents().subscribe((data:Evento[])=>{
      this.events = data;

      this.events.forEach(s => {
        s.iiId = [];
        s.interestIds.forEach(i => {
           s.iiId?.push(i.id_interest);
        });
      });

      console.log(this.events);

    });
  }

  @ViewChildren(MatExpansionPanel)
  panels!: QueryList<MatExpansionPanel>;

  category = new FormControl();
  interestList:Interest[] =[];
  events:Evento[] = [];


  async newEvent(){

    let ev:Evento = {
      id:0,
      title:"",
      description:"",
      dateRange:{id:0,from:'',to:''},
      interestIds:[],
      image:""
    }



    await this.eventService.postEvent(ev).subscribe((data:Evento)=>{

      this.events = [...this.events,{
        id:data.id,
        title:"",
        description:"",
        dateRange:{id:0,from:'',to:''},
        interestIds:[],
        image:""
        }];    
  
    });

  }

  getName(name:any){
    if(name){
      let n = name.split("\\");
      return n[n.length-1];
    }
  }

  changeEvent(data:Evento){

    if(data.iiId != null){
     
      let realInterest:LineaInteres_event[] = [];
       data.iiId.forEach(element => {
         realInterest.push({id:0,id_interest:element,id_event:data.id?data.id:0});
     });

     data.interestIds = realInterest;

    }

    this.eventService.putEvent(data).subscribe();
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
        this.eventService.deleteEvent(e.id).subscribe();
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
