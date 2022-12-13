import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { identity, Observable } from 'rxjs';
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
    return this.http.get(this.api + "/api/Opening/General");
  }
  getAllExceptions(): Observable<any> {
    return this.http.get(this.api + "/api/Opening/Exceptions");
  }


  postException(op:Horario): Observable<any> {
    return this.http.post(this.api + "/api/Opening/Exceptions",op);
  }


  deleteException(id:any):Observable<any> {
    console.log("id a eleminar",id);
    return this.http.delete(this.api + "/api/Opening/Exception/"+id);
  }


  putGeneral(op:any): Observable<any> {
    return this.http.put(this.api + "/api/Opening/General/1" , op);
  }

  putException(op:Horario):Observable<any>{
    return this.http.put(this.api + "/api/Opening/Exception/"+op.id , op);
  }



}
