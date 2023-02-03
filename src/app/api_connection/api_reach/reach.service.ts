import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, retry, throttleTime } from 'rxjs';
import { GlobalConstants } from 'src/app/common/global-constants';
import { Reach } from 'src/app/models/reach-model';

@Injectable({
  providedIn: 'root'
})
export class ReachService {

  api:string = GlobalConstants.api;
  defaultThrottleConfig = GlobalConstants.throttleConfig;

  constructor(private http: HttpClient) {}

  getAllReach(): Observable<any> {
    return this.http.get(this.api + "/api/ReachCMS").pipe(
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

  postReach(ev:Reach): Observable<any> {
    return this.http.post(this.api + "/api/Reach",ev).pipe(
      throttleTime(500, undefined, this.defaultThrottleConfig),
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

  putReach(ev:Reach): Observable<any> {
    return this.http.put(this.api + "/api/Reach/"+ev.id,ev).pipe(
      throttleTime(500, undefined, this.defaultThrottleConfig),
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

  deleteReach(id:any): Observable<any> {
    return this.http.delete(this.api + "/api/Reach/"+id).pipe(
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
