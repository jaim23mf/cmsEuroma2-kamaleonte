import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalConstants } from 'src/app/common/global-constants';
import { Servicio } from 'src/app/models/servicio-model';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  api:string = GlobalConstants.api;
  constructor(private http: HttpClient) {}

  getAllServices(): Observable<any> {
    return this.http.get(this.api + "/api/Service");
  }

  postService(ev:Servicio): Observable<any> {
    return this.http.post(this.api + "/api/Service",ev);
  }

  putService(ev:Servicio): Observable<any> {
    return this.http.put(this.api + "/api/Service/"+ev.id,ev);
  }

  deleteService(id:any): Observable<any> {
    return this.http.delete(this.api + "/api/Service/"+id);
  }
}
