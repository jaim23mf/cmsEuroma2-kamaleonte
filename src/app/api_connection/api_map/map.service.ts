import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, retry } from 'rxjs';
import { GlobalConstants } from 'src/app/common/global-constants';
import { Floor } from 'src/app/models/floor-model';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  api:string = GlobalConstants.api;
  constructor(private http: HttpClient) {}

  getAllFloors(): Observable<any> {
    return this.http.get(this.api + "/Map/Floor").pipe(
      map((res: any) => {
        if (!res) {
          console.log('Error occurred.');
          throw new Error('Error');
        }
        return res;
      }),
      retry(3)
    );
  }

  postFloor(ev:Floor): Observable<any> {
    return this.http.post(this.api + "/Map/Floor",ev).pipe(
      map((res: any) => {
        if (!res) {
          console.log('Error occurred.');
          throw new Error('Error');
        }
        return res;
      }),
      retry(3)
    );
  }

  putFloor(ev:Floor): Observable<any> {
    return this.http.put(this.api + "/Map/Floor/"+ev.id,ev).pipe(
      map((res: any) => {
        if (!res) {
          console.log('Error occurred.');
          throw new Error('Error');
        }
        return res;
      }),
      retry(3)
    );
  }

  deleteFloor(id:any): Observable<any> {
    return this.http.delete(this.api + "/Map/Floor/"+id).pipe(
      map((res: any) => {
        if (!res) {
          console.log('Error occurred.');
          throw new Error('Error');
        }
        return res;
      }),
      retry(3)
    );
  }
  uploadGltf(id:any,file:any): Observable<any> {
    return this.http.post(this.api + "/Map/Floor/"+id + "/GltfFile",file).pipe(
      map((res: any) => {
        if (!res) {
          console.log('Error occurred.');
          throw new Error('Error');
        }
        return res;
      }),
      retry(3)
    );
  }
}
