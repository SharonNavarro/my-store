import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { Product } from '../../models/product.model'
import { StoreService } from 'src/app/services/store.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  myShoppingCart: Product[] = [];
  total = 0;
  products: Product[] = [];
  today = new Date();
  date = new Date(2021, 1, 21);

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    //lo ponemos aqui ya que no es asincrono
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    this.productsService.getAllProducts()
    .subscribe(data => {
      this.products = data;
    })
  }

  // products: Product[] = [
  //   {
  //     id: '1',
  //     name: 'EL mejor juguete',
  //     price: 565,
  //     image: '../assets/toy.jpg'
  //   },
  //   {
  //     id: '2',
  //     name: 'Bicicleta casi nueva',
  //     price: 356,
  //     image: '../assets/bike.jpg'
  //   },
  //   {
  //     id: '3',
  //     name: 'Colleción de albumnes',
  //     price: 34,
  //     image: '../assets/album.jpg'
  //   },
  //   {
  //     id: '4',
  //     name: 'Mis libros',
  //     price: 23,
  //     image: '../assets/books.jpg'
  //   },
  // ];
  // https://picsum.photos/200

  onAddToShppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total =  this.storeService.getTotal();

    console.log(this.myShoppingCart)
  }

}
