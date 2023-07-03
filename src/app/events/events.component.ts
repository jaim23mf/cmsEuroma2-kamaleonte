import { Component, QueryList, ViewChildren } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionPanel } from '@angular/material/expansion';
import { delay, retry, Subscription } from 'rxjs';
import { EventsService } from '../api_connection/api_events/events.service';
import { InterestService } from '../api_connection/api_interest/interest.service';
import { setLocalTime } from '../common/global-constants';
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
  currentItemsToShow:Evento[]= [];
  pageSize = 10;
  pagesLength = 0;
  subs:Subscription;

  public constructor(private dateAdapter: DateAdapter<Date>,public confirm: MatDialog,public errorDialog: MatDialog, private msg_service:MsgService, private interestService:InterestService, private eventService: EventsService){
    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy

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
      this.pagesLength = this.events.length;
      this.currentItemsToShow = this.events.slice(0,this.pageSize);
      //console.log(this.events);

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
      title_it:"",
      description:"",
      description_it:"",
      dateRange:{id:0,from:'',to:''},
      interestIds:[],
      image:"",
      youtubeLink:""
    }

    //this.events = [...this.events,ev];
    let aux:Evento[] = [];
    aux.push(ev);
    this.events = aux.concat(this.events);
    this.currentItemsToShow = this.events.slice(0,this.pageSize);

    /*await this.eventService.postEvent(ev).subscribe((data:Evento)=>{

      this.events = [...this.events,{
        id:data.id,
        title:"",
        title_it:"",
        description:"",
        description_it:"",
        dateRange:{id:0,from:'',to:''},
        interestIds:[],
        image:"",
        youtubeLink:""
        }];    
  
    });*/

  }

  getName(name:any){
    if(name){
      let n = name.split("\\");
      return n[n.length-1];
    }
  }

  changeEvent(data:Evento){

    /*if(data.iiId != null){
     
      let realInterest:LineaInteres_event[] = [];
       data.iiId.forEach(element => {
         realInterest.push({id:0,id_interest:element,id_event:data.id?data.id:0});
     });

     data.interestIds = realInterest;

    }*/
    if(data.description == null) {data.description="";}
    if(data.description_it == null) {data.description_it="";}
    if(data.title_it == null) {data.title_it="";}
    if(data.youtubeLink == null) {data.youtubeLink="";}
    if(data.dateRange.from == null){data.dateRange.from = "";}
    if(data.dateRange.to == null){data.dateRange.to = "";}
    //this.eventService.putEvent(data).subscribe();
  }


  saveEvent(p:Evento){
 
    if(p.description == null) {p.description="";}
    if(p.description_it == null) {p.description_it="";}
    if(p.title_it == null) {p.title_it="";}
    if(p.dateRange.from == null){p.dateRange.from = "";}
    else{p.dateRange.from = setLocalTime(p.dateRange.from);}
    if(p.dateRange.to == null){p.dateRange.to = "";}
    else{p.dateRange.to = setLocalTime(p.dateRange.to);}

    if(p.youtubeLink == null) {p.youtubeLink="";}

    this.confirm
   .open(ConfirmDialogComponent, {
     data: 'You are going to save this event.'
   })
   .afterClosed()
   .subscribe((confirmado: Boolean) => {
     if (confirmado) {

   let errorSave:Boolean = false;;

   if(p.title == "") {errorSave=true;}
   if(p.title_it == "") {errorSave=true;}
   if(p.dateRange.from == ""){errorSave=true;}
   if(p.dateRange.to == ""){errorSave=true;}
   if(!errorSave){
       if(p.id == 0 ){
        this.eventService.postEvent(p).subscribe((data:Evento)=>{
           p = data;
           p.dateRange.id = data.dateRange.id;
         });
       }
       else{
        if(p.iiId != null){
     
          let realInterest:LineaInteres_event[] = [];
           p.iiId.forEach(element => {
             realInterest.push({id:0,id_interest:element,id_event:p.id?p.id:0});
         });
    
         p.interestIds = realInterest;
    
        }
        this.eventService.putEvent(p).subscribe();       
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
    //console.log(value.msg);
    
  }

  onPageChange($event: { pageIndex: number; pageSize: number; }) {
    this.pageSize = $event.pageSize;
    this.currentItemsToShow =  this.events.slice($event.pageIndex*$event.pageSize, $event.pageIndex*$event.pageSize + $event.pageSize);
  }
  
  search(text:string){
    let filter:Evento[] = this.events.filter(elem => elem.title.toLowerCase().includes(text.toLowerCase()));
    this.currentItemsToShow = filter.slice(0,this.pageSize);
    this.pagesLength = filter.length;
  
  }    

  ngOnDestroy(){
    this.subs.unsubscribe();
  }

}
