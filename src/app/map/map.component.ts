import { Component, QueryList, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionPanel } from '@angular/material/expansion';
import { MapInfo } from '../models/map-info-model';
import { Floor } from '../models/floor-model';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { MsgService } from '../msg.service';
import { Subscription } from 'rxjs';
import { MapService } from '../api_connection/api_map/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {

  subs:Subscription;

  public constructor(public confirm: MatDialog, private msg_service:MsgService, private floorService:MapService){
    this.subs = this.msg_service.getText().subscribe(this.fileUploaded);

    this.floorService.getAllFloors().subscribe((data:Floor[])=>{
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

    this.floorService.postFloor(f).subscribe((data:Floor)=>{
      this.floors = [...this.floors,{
        id:data.id,
        name: data.name,
        modelUrl:data.modelUrl
      }];
    });
  }

  changeFloor(f:Floor){
    this.floorService.putFloor(f).subscribe();
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


  fileUploaded(value:any){
    console.log(value.msg);
    
  }

  open3D(piso:Floor){

  }

  ngOnDestroy(){
    this.subs.unsubscribe();
  }
}
