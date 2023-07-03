import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, debounceTime, map, retry } from 'rxjs';
import { GlobalConstants } from 'src/app/common/global-constants';
import { Firebase, TargetType } from 'src/app/models/firebase-model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {


  api:string = GlobalConstants.api;

  constructor(private http: HttpClient) {}

    //LLAMADA GET A LA API
    getAllFire(): Observable<any> {
      return this.http.get(this.api + "/api/Firebase").pipe(
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


    getFireType(type:any): Observable<any> {
      console.log("Type ..." , type);
      return this.http.get(this.api + "/api/Firebase/Type/"+type).pipe(
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

    postFire(promo:Firebase): Observable<any>{
      return this.http.post(this.api + "/api/Firebase" , promo).pipe(
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

    sendMsg():Observable<any>{

      const message = {
        data: {
          score: '850',
          time: '2:45'
        },
        topic: TargetType.promotionEn
      };
      var header = {
        headers: new HttpHeaders()
          .set('Authorization',  'Bearer BB7SEwDXLYCjHG0a1tg_Ww5aAUG7Cm-f8SZeA_OWjpOAiWDpY7b6bqHZefaljv_HlAyCDYYlNtfiOx0k9MVBmWM')
      }
      
      return this.http.post("https://fcm.googleapis.com//v1/projects/pta-test-231fd/messages:send",message,header).pipe(
        map((res: any) => {
          console.log("Firebase -->",res);
          if (!res) {
            //console.log('Error occurred.');
            throw new Error('Error');
          }
          return res;
        })
      );
    }
}
