import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalConstants } from 'src/app/common/global-constants';
import { Promo } from 'src/app/models/promo-model';

@Injectable({
  providedIn: 'root'
})
export class PromoService {
  api:string = GlobalConstants.api;
  constructor(private http: HttpClient) {}

    //LLAMADA GET A LA API
    getAllPromo(): Observable<any> {
      return this.http.get(this.api + "/api/Promo");
    }

    postPromo(promo:Promo): Observable<any>{
      return this.http.post(this.api + "api/Promo/" + promo.id , promo);
    }

    putPromo(promo:Promo): Observable<any>{
      return this.http.put(this.api + "api/Promo/" + promo.id , promo);

    }

    deletePromo(promo:Promo): Observable<any>{
      return this.http.delete(this.api + "api/Promo/" + promo.id);
    }
}
