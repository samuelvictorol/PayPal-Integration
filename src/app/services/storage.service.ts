import { Injectable } from '@angular/core';
import { ICartItem } from '../interfaces/ICartItem';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  existsCart(){
    return localStorage.getItem('cart') != null;
  }

  setCart(cart: ICartItem[]): void {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  getCart(): ICartItem[] {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  }

  clear(): void {
    localStorage.removeItem('cart');
  }
}
