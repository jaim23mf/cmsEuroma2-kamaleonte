import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, retry, debounceTime } from 'rxjs';
import { GlobalConstants } from 'src/app/common/global-constants';
import { Servicio } from 'src/app/models/servicio-model';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  api:string = GlobalConstants.api;

  constructor(private http: HttpClient) {}

  getAllServices(): Observable<any> {
    return this.http.get(this.api + "/api/Service").pipe(
      map((res: any) => {
        if (!res) {
          //console.log('Error occurred.');
          throw new Error('Error');
        }
        return res;
      }),
      retry(3)
    );
  }

  postService(ev:Servicio): Observable<any> {
    return this.http.post(this.api + "/api/Service",ev).pipe(
      debounceTime(5000),
      map((res: any) => {
        if (!res) {
          //console.log('Error occurred.');
          throw new Error('Error');
        }
        return res;
      }),
      retry(3)
    );
  }

  putService(ev:Servicio): Observable<any> {
    return this.http.put(this.api + "/api/Service/"+ev.id,ev).pipe(
      debounceTime(5000),
      map((res: any) => {
        if (!res) {
          //console.log('Error occurred.');
          throw new Error('Error');
        }
        return res;
      }),
      retry(3)
    );
  }

  deleteService(id:any): Observable<any> {
    return this.http.delete(this.api + "/api/Service/"+id).pipe(
      map((res: any) => {
        if (!res) {
          //console.log('Error occurred.');
          throw new Error('Error');
        }
        return res;
      }),
      retry(3)
    );
  }
}
