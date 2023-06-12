import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { debounceTime, distinctUntilChanged, map, Observable, retry} from 'rxjs';
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
    return this.http.get(this.api + "/Shop/Category").pipe(
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

  getAllSubCategory(): Observable<any> {
    return this.http.get(this.api + "/Shop/SubCategory").pipe(
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

  getAllShop(): Observable<any> {
    return this.http.get(this.api + "/Shop").pipe(
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

  getCategory(id:any): Observable<any> {
    return this.http.get(this.api + "/Shop/Category/"+id).pipe(
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

  getSubCategory(id:any): Observable<any> {
    return this.http.get(this.api + "/Shop/SubCategory/"+id).pipe(
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

  getShop(id:any): Observable<any> {
    return this.http.get(this.api + "/Shop/"+id).pipe(
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


  //LLAMADA POST A LA API
  postCategory(shop: Category): Observable<any> {
    return this.http.post(this.api + "/Shop/Category",shop).pipe(
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
  postSubCategory(shop: Subcategory): Observable<any> {
    return this.http.post(this.api + "/Shop/SubCategory",shop).pipe(
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
  postShop(id: any): Observable<any> {
    return this.http.post(this.api + "/Shop",id).pipe(
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


  //LLAMADA PUT A LA API
  putCategory(shop: Category): Observable<any> {
    console.log(shop);
    return this.http.put(this.api + "/Shop/Category/"+shop.id,shop).pipe(
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
  putSubCategory(id: any): Observable<any> {
    return this.http.put(this.api + "/Shop/SubCategory/"+id.id,id).pipe(
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
  putShop(id: any): Observable<any> {
    return this.http.put(this.api + "/Shop/"+id.id,id).pipe(
      debounceTime(10000),
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
  //LLAMADA DELETE A LA API
  deleteCategory(id: any): Observable<any> {
    return this.http.delete(this.api + "/Shop/Category/"+id).pipe(
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
  deleteSubCategory(id: any): Observable<any> {
    return this.http.delete(this.api + "/Shop/SubCategory/"+id).pipe(
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
  deleteShop(id: any): Observable<any> {
    return this.http.delete(this.api + "/Shop/"+id).pipe(
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
