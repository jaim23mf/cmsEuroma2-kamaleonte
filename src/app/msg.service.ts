import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MsgService {

  private subject: Subject<any> = new Subject<any>();

  sendText(text:String, type?:Number , tipo?:Number){
    this.subject.next({msg:text, type:type , tipo:tipo});
  }

  getText():Observable<any>{
    return this.subject.asObservable();
  }

}
