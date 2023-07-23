import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces/IProduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: IProduct[] = [
    { id: 1, name: 'Guitarra 1', description: 'lorem impsum', price: 200.00, imageUrl: 'assets/guitarra.jpg' },	
    { id: 2, name: 'Guitarra 2', description: 'lorem impsum', price: 900.00, imageUrl: 'assets/guitarra2.jpg' },
    { id: 3, name: 'Guitarra 3', description: 'lorem impsum', price: 500.00, imageUrl: 'assets/guitarra3.jpg' },
    { id: 4, name: 'Guitarra 4', description: 'lorem impsum', price: 1000.00, imageUrl: 'assets/guitarra4.jpg' },
    { id: 5, name: 'Guitarra 5', description: 'lorem impsum', price: 300.00, imageUrl: 'assets/guitarra5.jpg' },
    { id: 6, name: 'Guitarra 6', description: 'lorem impsum', price: 400.00, imageUrl: 'assets/guitarra6.jpg' }
  ];

  constructor() { }

  public getProducts(): IProduct[] {
    return this.products;
  }

}
