import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, retry } from 'rxjs';
import { GlobalConstants } from 'src/app/common/global-constants';
import { Evento } from 'src/app/models/evento-model';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  api:string = GlobalConstants.api;
  constructor(private http: HttpClient) {}

  getAllEvents(): Observable<any> {
    return this.http.get(this.api + "/api/Events/EventCMS").pipe(
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

  postEvent(ev:Evento): Observable<any> {
    return this.http.post(this.api + "/api/Events",ev).pipe(
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

  putEvent(ev:Evento): Observable<any> {
    console.log(this.api + "/api/Events/"+ev.id,ev);
    return this.http.put(this.api + "/api/Events/"+ev.id,ev).pipe(
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

  deleteEvent(id:any): Observable<any> {
    return this.http.delete(this.api + "/api/Events/"+id).pipe(
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
