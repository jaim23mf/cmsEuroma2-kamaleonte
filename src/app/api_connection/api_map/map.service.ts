import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalConstants } from 'src/app/common/global-constants';
import { Floor } from 'src/app/models/floor-model';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  api:string = GlobalConstants.api;
  constructor(private http: HttpClient) {}

  getAllFloors(): Observable<any> {
    return this.http.get(this.api + "/Map/Floor");
  }

  postFloor(ev:Floor): Observable<any> {
    return this.http.post(this.api + "/Map/Floor",ev);
  }

  putFloor(ev:Floor): Observable<any> {
    return this.http.put(this.api + "/Map/Floor/"+ev.id,ev);
  }

  deleteFloor(id:any): Observable<any> {
    return this.http.delete(this.api + "/Map/Floor/"+id);
  }
  uploadGltf(id:any,file:any): Observable<any> {
    return this.http.post(this.api + "/Map/Floor/"+id + "/GltfFile",file);
  }
}
