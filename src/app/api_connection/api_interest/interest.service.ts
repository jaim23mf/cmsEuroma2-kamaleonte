import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, retry } from 'rxjs';
import { GlobalConstants } from 'src/app/common/global-constants';
import { Interest } from 'src/app/models/interest.model';

@Injectable({
  providedIn: 'root'
})
export class InterestService {

  api:string = GlobalConstants.api;
  defaultThrottleConfig = GlobalConstants.throttleConfig;

  constructor(private http: HttpClient) {}

  getAllInterests(): Observable<any> {
    return this.http.get(this.api + "/api/Interest").pipe(
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

  getInterest(id:any):Observable<any>{
    return this.http.get(this.api + "/api/Interest/"+id).pipe(
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

  putInterest(i:Interest):Observable<any>{
    return this.http.put(this.api + "/api/Interest/"+i.id,i).pipe(
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

  postInterest(i:Interest):Observable<any>{
    return this.http.post(this.api + "/api/Interest",i).pipe(
      throttleTime(500, undefined, this.defaultThrottleConfig),
      map((res: any) => {
        if (!res) {
          //console.log('Error occurred.');
          throw new Error('Error');
        }
        console.log(res);
        return res;
      }),
      retry(3)
    );
  }
  deleteInterest(i:any):Observable<any>{
    return this.http.delete(this.api + "/api/Interest/" + i).pipe(
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
