import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Firebase, NotificationIds, NotificationType, TargetType } from '../models/firebase-model';
import { Subscription } from 'rxjs';
import { DateAdapter } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MsgService } from '../msg.service';
import { MatExpansionPanel } from '@angular/material/expansion';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { FirebaseService } from '../api_connection/api_firebase/firebase.service';

@Component({
  selector: 'app-frirebase',
  templateUrl: './frirebase.component.html',
  styleUrls: ['./frirebase.component.css']
})
export class FrirebaseComponent {
  currentItemsToShow:Firebase[]= [];
  pageSize = 10;
  pagesLength = 0;
  public NotificationTypes = [
    {key:0,value:"Promotion"},
    {key:1,value:"New Opening"},
    {key:2,value:"Events"},
    {key:3,value:"--"}
  ];

  NotificationIds:NotificationIds[]=[];

  target:String = "";
  subs:Subscription;

  public constructor(private dateAdapter: DateAdapter<Date>,public confirm: MatDialog,public errorDialog: MatDialog,  private msg_service:MsgService ,
    private fireService:FirebaseService )
    {
      this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
      this.subs = this.msg_service.getText().subscribe((data:any) =>{
        let mens = this.mensajes.find(f=>f.id == data.type); 
  
        if(mens){
          mens.image = data.msg;
          this.changeFire(mens);
        }
  
      });
      
      console.log(this.NotificationTypes);

      this.fireService.getAllFire().subscribe((data:Firebase[])=>{
        this.mensajes = data;
        this.mensajes.forEach(e=>{
          e.editable = false;
        });
        this.pagesLength = this.mensajes.length;
        this.currentItemsToShow = this.mensajes.slice(0,this.pageSize);
        //console.log(this.promociones);
      });
    }
  

    @ViewChildren(MatExpansionPanel)
    panels!: QueryList<MatExpansionPanel>;
  
    mensajes:Firebase[] = [];
  
    async newFire(){
      let fire:Firebase = {
        id:0,
        title:"",
        name:"",
        image:"",
        msg:"",
        target:TargetType.none,
        notificationType:NotificationType.none,
        notificationId:0,
        date:new Date(),
        editable:true
      };
      //this.mensajes = [...this.mensajes,fire];

      let aux:Firebase[] = [];
      aux.push(fire);
      this.mensajes = aux.concat(this.mensajes);
      this.currentItemsToShow = this.mensajes.slice(0,this.pageSize);


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


    /*deletePromo(p:Firebase){
      this.confirm
      .open(ConfirmDialogComponent, {
        data: 'You are going to delete this promo.'
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.mensajes = this.mensajes.filter((event) => event !== p);
          this.fireService.deleteFire(p).subscribe();
        } 
      });
      
    }*/
  
    getName(name:any){
      if(name){
        let n = name.split("\\");
        return n[n.length-1];
      }
    }
    type:Number = 3;
    changeFire(p:Firebase){

      if(p.title == null) {p.title="";}
      if(p.name == null) {p.name="";}
      if(p.image == null) {p.image="";}
      if(p.msg == null){p.msg = "";}
      p.notificationName = this.NotificationIds.find(elem => elem.id = p.notificationId)?.title;


      if(p.notificationType != this.type){
        this.type = p.notificationType;
        this.fireService.getFireType(p.notificationType).subscribe((data:NotificationIds[])=>{
          this.NotificationIds = data;
          //console.log(this.promociones);
        });

      }
    }



    onPageChange($event: { pageIndex: number; pageSize: number; }) {
      this.pageSize = $event.pageSize;
      this.currentItemsToShow =  this.mensajes.slice($event.pageIndex*$event.pageSize, $event.pageIndex*$event.pageSize + $event.pageSize);
    }
    
    search(text:string){
      let filter:Firebase[] = this.mensajes.filter(elem => elem.title.toLowerCase().includes(text.toLowerCase()));
      this.currentItemsToShow = filter.slice(0,this.pageSize);
      this.pagesLength = filter.length;
    
    }    
      ngOnDestroy(){
        this.subs.unsubscribe();
      }




   
      saveFire(p:Firebase){
     
        this.confirm
       .open(ConfirmDialogComponent, {
         data: 'You are going to send this notification.'
       })
       .afterClosed()
       .subscribe((confirmado: Boolean) => {
         if (confirmado) {
    console.log("-->" , p);
       let errorSave:Boolean = false;;
       if(p.title == "") {errorSave=true;}
       if(p.msg == "") {errorSave=true;}
       if(p.notificationType == NotificationType.none){errorSave=true;}
       if(this.target == ""){errorSave=true;}
       if(p.notificationId == 0 ){errorSave=true;}

       if(!errorSave){
           if(p.id == 0 ){
            console.log(p.notificationType + p.target);
            p.target = TargetType.eventsIt;
            
            switch(p.notificationType){
              case NotificationType.events:
              if(this.target.toUpperCase() == "IT"){
                p.target=TargetType.eventsIt;
              }
              else{
                p.target = TargetType.eventsEn;
              }
                break;
              case NotificationType.promotion:
                if(this.target.toUpperCase() == "IT"){
                  p.target=TargetType.promotionIt;
                }
                else{
                  p.target = TargetType.promotionEn;
                }
                break;
              case NotificationType.newOpening:
                if(this.target.toUpperCase() == "IT"){
                  p.target=TargetType.newOpeningIt;
                }
                else{
                  p.target = TargetType.newOpeningEn;
                }
                break;
              default:
                p.target = TargetType.none;
                break;
            }
            p.editable = false;
            this.fireService.postFire(p).subscribe((data:Firebase)=>{
               p = data;
             });

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

}
