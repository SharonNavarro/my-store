import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { BehaviorSubject } from 'rxjs';
//crear un observavble para que demas componentes se puedan subscribir apenas reciba un cambio
// esto se puede utilizar en lugar de transmitir datos con input y output, ya que se
//se evita pasar por todo el arbol de DOM para llegar al nodo que exactamente queremos.
//en lugar de eso, se alamacena en un storage que va directamente al nodo que queremos y ya no lo repasa todo el DOM

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private myShoppingCart: Product[] = [];
  private myCart = new BehaviorSubject<Product[]>([])
  //de tipo Product[], y su valor inicial es un array vacio

  myCart$ = this.myCart.asObservable();
  //buena practica es que un observable termine en signo de dolar

  constructor() { }

  addProduct(product: Product) {
    this.myShoppingCart.push(product);
    this.myCart.next(this.myShoppingCart)
    //vamos a transmitir el estado de la lista de productos a los que esten interesados en recibir
  }

  getShoppingCart() {
    return this.myShoppingCart;
  }

  getTotal() {
    return this.myShoppingCart.reduce((sum, item) => sum + item.price, 0)
  }
}
