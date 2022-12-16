import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalConstants } from 'src/app/common/global-constants';
import { Evento } from 'src/app/models/evento-model';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  api:string = GlobalConstants.api;
  constructor(private http: HttpClient) {}

  getAllEvents(): Observable<any> {
    return this.http.get(this.api + "/api/Events");
  }

  postEvent(ev:Evento): Observable<any> {
    return this.http.post(this.api + "/api/Events",ev);
  }

  putEvent(ev:Evento): Observable<any> {
    return this.http.put(this.api + "/api/Events/"+ev.id,ev);
  }

  deleteEvent(id:any): Observable<any> {
    return this.http.delete(this.api + "/api/Events/"+id);
  }
  
}
