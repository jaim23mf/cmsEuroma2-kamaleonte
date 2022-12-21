import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { identity, map, Observable, retry } from 'rxjs';
import { GlobalConstants } from 'src/app/common/global-constants';
import { Horario } from 'src/app/models/horario-model';

@Injectable({
  providedIn: 'root'
})
export class OpeningService {

  api:string = GlobalConstants.api;
  constructor(private http: HttpClient) {}



  //LLAMADA GET A LA API
  getAllOpening(): Observable<any> {
    return this.http.get(this.api + "/api/Opening/General").pipe(
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
  getAllExceptions(): Observable<any> {
    return this.http.get(this.api + "/api/Opening/Exceptions").pipe(
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


  postException(op:Horario): Observable<any> {
    return this.http.post(this.api + "/api/Opening/Exceptions",op).pipe(
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


  deleteException(id:any):Observable<any> {
    console.log("id a eleminar",id);
    return this.http.delete(this.api + "/api/Opening/Exception/"+id).pipe(
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


  putGeneral(op:any): Observable<any> {
    return this.http.put(this.api + "/api/Opening/General/1" , op).pipe(
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

  putException(op:Horario):Observable<any>{
    return this.http.put(this.api + "/api/Opening/Exception/"+op.id , op).pipe(
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
