import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, retry } from 'rxjs';
import { GlobalConstants } from 'src/app/common/global-constants';
import { BlogEntry } from 'src/app/models/blog-model';

@Injectable({
  providedIn: 'root'
})
export class ApiBlogService {
  api:string = GlobalConstants.api;
  constructor(private http: HttpClient) {}

  getAllBlog(): Observable<any> {
    return this.http.get(this.api + "/api/BlogCMS").pipe(
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

  postBlog(ev:BlogEntry): Observable<any> {
    return this.http.post(this.api + "/api/Blog",ev).pipe(
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

  putBlog(ev:BlogEntry): Observable<any> {
    return this.http.put(this.api + "/api/Blog/"+ev.id,ev).pipe(
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
    return this.http.delete(this.api + "/api/Blog/"+id).pipe(
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
