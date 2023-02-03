import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, retry, throttleTime } from 'rxjs';
import { GlobalConstants } from 'src/app/common/global-constants';
import { Promo } from 'src/app/models/promo-model';

@Injectable({
  providedIn: 'root'
})
export class PromoService {
  api:string = GlobalConstants.api;
  defaultThrottleConfig = GlobalConstants.throttleConfig;

  constructor(private http: HttpClient) {}

    //LLAMADA GET A LA API
    getAllPromo(): Observable<any> {
      return this.http.get(this.api + "/api/Promo").pipe(
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

    postPromo(promo:Promo): Observable<any>{
      return this.http.post(this.api + "/api/Promo" , promo).pipe(
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

    putPromo(promo:Promo): Observable<any>{
      return this.http.put(this.api + "/api/Promo/" + promo.id , promo).pipe(
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

    deletePromo(promo:Promo): Observable<any>{
      return this.http.delete(this.api + "/api/Promo/" + promo.id).pipe(
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
