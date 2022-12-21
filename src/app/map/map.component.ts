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

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {

  subs:Subscription;

  public constructor(public confirm: MatDialog, private msg_service:MsgService, private floorService:MapService){


    this.subs = this.msg_service.getText().pipe(retry(3), delay(1000)).subscribe((data:any)=>{
      let floor = this.floors.find(f=>f.id == data.type); 

      if(floor){
        floor.modelUrl = data.msg;
        this.floorService.putFloor(floor).subscribe();
      }
    });


    this.floorService.getAllFloors().pipe(retry(3), delay(1000)).subscribe((data:Floor[])=>{
      this.floors = data;
    });

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
      name:""
    };

    this.floorService.postFloor(f).pipe(retry(3), delay(1000)).subscribe((data:Floor)=>{
      this.floors = [...this.floors,{
        id:data.id,
        name: data.name,
        modelUrl:data.modelUrl
      }];
    });
  }

  changeFloor(f:Floor){
    this.floorService.putFloor(f).pipe(retry(3), delay(1000)).subscribe();
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
        this.floorService.deleteFloor(piso.id).pipe(retry(3), delay(1000)).subscribe();
      } 
    });
  }


  getName(name:any){
    if(name){
      let n = name.split("\\");
      return n[n.length-1];
    }
  }

  open3D(piso:Floor){

  }

  ngOnDestroy(){
    this.subs.unsubscribe();
  }
}
