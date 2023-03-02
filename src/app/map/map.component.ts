import { Component, QueryList, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionPanel } from '@angular/material/expansion';
import { MapInfo } from '../models/map-info-model';
import { Floor } from '../models/floor-model';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { MsgService } from '../msg.service';
import { delay, retry, Subscription } from 'rxjs';
import { MapService } from '../api_connection/api_map/map.service';
import { Router } from '@angular/router';
import { UsersService } from '../usersService/users.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {
  admin = false;
  subs:Subscription;
  profile = 0;
  public constructor(public confirm: MatDialog, private userService:UsersService,  public erorDialog:MatDialog,private msg_service:MsgService, private floorService:MapService , private router:Router){
    this.profile = +this.userService.getProfile();
    if(this.profile == 1){this.admin=true;}
    else{this.admin = false;}

    if(this.profile !=0 ){this.subs = this.msg_service.getText().subscribe((data:any)=>{
      let floor = this.floors.find(f=>f.id == data.type); 
      if(floor){


        if(data.tipo == 0){
          floor.modelUrl = data.msg;

        }
        else {
          floor.modelBinUrl = data.msg;
        }

        this.floorService.putFloor(floor).subscribe();
      }
    });


    this.floorService.getAllFloors().subscribe((data:Floor[])=>{
      this.floors = data;
    });
  }
  else {this.subs = new Subscription();}

  }

  @ViewChildren(MatExpansionPanel)
  panels!: QueryList<MatExpansionPanel>;

  floors:Floor[] = [];

  mapInfo:MapInfo = {floors:this.floors};

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

  newFloor(){

    let f : Floor = {
      id:0,
      modelUrl:"",
      modelBinUrl:"",
      name:"",
      name_it:"",
      floor:1,
      navPoints:[],
      shopsNodes:[]
    };

    this.floors = [...this.floors,f];
    /*this.floorService.postFloor(f).subscribe((data:Floor)=>{
      this.floors = [...this.floors,{
        id:data.id,
        name: data.name,
        name_it:data.name_it,
        modelUrl:data.modelUrl,
        modelBinUrl:data.modelBinUrl,
        floor:data.floor,
        navPoints:data.navPoints,
        shopsNodes:data.shopsNodes
      }];
    });*/
  }

  changeFloor(f:Floor){
    //this.floorService.putFloor(f).subscribe();
  }

  saveFloor(f:Floor){ 
      this.confirm
      .open(ConfirmDialogComponent, {
        data: 'You are going to save this floor.'
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
  
      let errorSave:Boolean = false;;
      
      if(f.name == ""){errorSave =true;}
      if(f.name_it == ""){errorSave = true;}
      if(f.floor == null){errorSave = true;}
      if(!errorSave){
          if(f.id == 0 ){
  
            this.floorService.postFloor(f).subscribe((data:Floor)=>{
              f = data;
              })
          }
          else{
            this.floorService.putFloor(f).subscribe();         
          }
      }
      else{
        this.erorDialog.open(ConfirmDialogComponent, {data: 'You need to enter all required fields.'});

      }
        } 
      });

}

  deleteFloor(piso:Floor){
    this.confirm
    .open(ConfirmDialogComponent, {
      data: 'You are going to delete this floor.'
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        this.floors = this.floors.filter((event) => event !== piso);
        this.floorService.deleteFloor(piso.id).subscribe();
      } 
    });
  }


  getName(name:any){
    if(name){
      let n = name.split("/");
      return n[n.length-1];
    }
  }

  open3D(piso:Floor){

    this.router.navigateByUrl("/MapEditor/"+piso.id);
  }

  ngOnDestroy(){
    this.subs.unsubscribe();
  }
}
