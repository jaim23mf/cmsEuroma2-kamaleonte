import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MapService } from '../api_connection/api_map/map.service';
import { EditorComponetProxy } from '../editor-communication/editor-component-proxy';
import { FloorSaveInfo } from '../editor-communication/models/floor-save-info.type';
import { EditorRequest } from '../editor-communication/requests/editor-request';
import { RequestType } from '../editor-communication/requests/request-type';
import { ResponseType } from '../editor-communication/responses/response-type';

@Component({
  selector: 'app-map-editor',
  templateUrl: './map-editor.component.html',
  styleUrls: ['./map-editor.component.css']
})
export class MapEditorComponent implements OnInit {
    public _hostingIframe!: HTMLIFrameElement;
    public  componentProxy = new EditorComponetProxy(window);
    constructor(private mapService:MapService, private _route:ActivatedRoute,private _router:Router) {}

    private piso:Number = 0;
    private lang:string="en";
  ngOnInit(): void {
    this._hostingIframe = document.getElementById("iframeId") as HTMLIFrameElement;
    this.componentProxy = new EditorComponetProxy(this._hostingIframe.contentWindow!);
    this.componentProxy.addListener((request) => this.onRequestReceived(request));

    this._route.params.subscribe((params:Params) =>{
        this.piso = params['floor'];
    });

  }


  private onRequestReceived(request: EditorRequest): void {
    switch (request.type) {
        case RequestType.FloorInfo:
            this.sendFloorInfo();
            break;
        case RequestType.FloorsNavPointsInfo:
            this.sendFloorsNavPoints(request.excludeFloor);
            break;
        case RequestType.Save:
            this.saveFloorInfo(request.data);
            this._hostingIframe.src = this._hostingIframe.src;
            break;
        case RequestType.ShopsList:
            this.sendShopsList();
            break;
    }
}

ngOnDestroy(){
  this.componentProxy.dispose();
}


private sendFloorInfo(){
 this.mapService.getFloor(this.piso,this.lang).subscribe((data:any) =>{
  this.componentProxy.sendResponse({
    type: ResponseType.FloorInformation,
    data: data
  });
});
}

private saveFloorInfo(data:FloorSaveInfo){
  this.mapService.saveFloor(this.piso,data).subscribe((data:any) =>{

  });
  //No need to response this request...?
  /*this.componentProxy.sendResponse({
    type: ResponseType.FloorInformation,
    data: {
      id: "1",
      modelUrl: "PTA00.gltf",
      name: "floor.name",
      navPoints: data.navPoints,
      shopsNodes: data.shopsNodes
  }
  });*/
}


private sendShopsList(){
  this.mapService.getShopList().subscribe((data:any) =>{
  this.componentProxy.sendResponse({
    type: ResponseType.ShopsList,
    data: data
  });
});
}


private sendFloorsNavPoints(s:string|undefined |null){
  console.log(s);
  this.mapService.getNavInfoPoint().subscribe((data:any) =>{
  this.componentProxy.sendResponse({
    type: ResponseType.FloorsNavPointsInfo,
    data: data
  });
});
}



/*componentProxy.sendResponse({
  type: ResponseType.FloorInformation,
  data: {
      id: floorId,
      modelUrl: floor.modelUrl,
      name: floor.name,
      navPoints: savedFloorInfo?.navPoint || [],
      shopsNodes: savedFloorInfo?.shopsNodes || []
  }
});*/

}
