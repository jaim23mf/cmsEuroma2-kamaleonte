import { Component, QueryList, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionPanel } from '@angular/material/expansion';
import { MapInfo } from '../models/map-info-model';
import { Floor } from '../models/floor-model';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { MsgService } from '../msg.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {

  subs:Subscription;

  public constructor(public confirm: MatDialog, private msg_service:MsgService){
    this.subs = this.msg_service.getText().subscribe(this.fileUploaded);
  }

  @ViewChildren(MatExpansionPanel)
  panels!: QueryList<MatExpansionPanel>;

  floors:Floor[] = [
    {
      id:null,
      modelUrl:null,
      name:"Piso 0"
    }
  ];

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
    this.floors = [...this.floors,{
      id:null,
      name: "",
      modelUrl:null
    }];
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
