import { HttpClient, HttpHeaders } from '@angular/common/http';
import { identifierName } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalConstants } from 'src/app/common/global-constants';
import { Category } from 'src/app/models/category-model';
import { Subcategory } from 'src/app/models/subcat-model';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  api:string = GlobalConstants.api;
  constructor(private http: HttpClient) {}



  //LLAMADA GET A LA API
  getAllCategory(): Observable<any> {
    return this.http.get(this.api + "/Shop/Category");
  }

  getAllSubCategory(): Observable<any> {
    return this.http.get(this.api + "/Shop/SubCategory");
  }

  getAllShop(): Observable<any> {
    return this.http.get(this.api + "/Shop");
  }

  getCategory(id:any): Observable<any> {
    return this.http.get(this.api + "/Shop/Category/"+id);
  }

  getSubCategory(id:any): Observable<any> {
    return this.http.get(this.api + "/Shop/SubCategory/"+id);
  }

  getShop(id:any): Observable<any> {
    return this.http.get(this.api + "/Shop/"+id);
  }


  //LLAMADA POST A LA API
  postCategory(shop: Category): Observable<any> {
    return this.http.post(this.api + "/Shop/Category",shop);
  }
  postSubCategory(shop: Subcategory): Observable<any> {
    return this.http.post(this.api + "/Shop/SubCategory",shop);
  }
  postShop(id: any): Observable<any> {
    return this.http.post(this.api + "/Shop",id);
  }


  //LLAMADA PUT A LA API
  putCategory(shop: Category): Observable<any> {
    return this.http.put(this.api + "/Shop/Category/"+shop.id,shop);
  }
  putSubCategory(id: any): Observable<any> {
    return this.http.put(this.api + "/Shop/SubCategory/"+id.id,id);
  }
  putShop(id: any): Observable<any> {
    return this.http.put(this.api + "/Shop/"+id.id,id);
  }
  //LLAMADA DELETE A LA API
  deleteCategory(id: any): Observable<any> {
    return this.http.delete(this.api + "/Shop/Category/"+id);
  }
  deleteSubCategory(id: any): Observable<any> {
    return this.http.delete(this.api + "/Shop/SubCategory/"+id);
  }
  deleteShop(id: any): Observable<any> {
    return this.http.delete(this.api + "/Shop/"+id);
  }

}
