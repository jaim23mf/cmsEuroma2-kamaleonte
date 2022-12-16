import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalConstants } from 'src/app/common/global-constants';
import { Interest } from 'src/app/models/interest.model';

@Injectable({
  providedIn: 'root'
})
export class InterestService {

  api:string = GlobalConstants.api;
  constructor(private http: HttpClient) {}

  getAllInterests(): Observable<any> {
    return this.http.get(this.api + "/api/Interest");
  }

  getInterest(id:any):Observable<any>{
    return this.http.get(this.api + "/api/Interest/"+id);
  }

  putInterest(i:Interest):Observable<any>{
    return this.http.put(this.api + "/api/Interest/"+i.id,i);
  }

  postInterest(i:Interest):Observable<any>{
    return this.http.post(this.api + "/api/Interest",i);
  }
  deleteInterest(i:any):Observable<any>{
    return this.http.delete(this.api + "/api/Interest/" + i);
  }


}
