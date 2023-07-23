import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IProduct } from '../interfaces/IProduct';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor() { }

  message = new Subject()

  sendMessage(product: IProduct) {
    this.message.next(product)
  }

  getMessage(): Observable<any>{
    return this.message.asObservable()
  }

}
