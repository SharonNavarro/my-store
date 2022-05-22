import { Component, OnInit } from '@angular/core';
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
  showProductDetail = false;
  productChosen: Product = {
    id: "",
    price: 0,
    images: [],
    title: "",
    category: {
      id: "",
      name: ""
    },
    description: ""
  }

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

  // https://picsum.photos/200

  onAddToShppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total =  this.storeService.getTotal();

    console.log(this.myShoppingCart)
  }

  toggleProductDetail() {
    this.showProductDetail =!this.showProductDetail;
  }

  onShowProduct(id: string) {
    console.log("id", id)
    this.productsService.getProduct(id)
    .subscribe(data => {
      console.log("product", data)
      this.toggleProductDetail()
      this.productChosen = data;
    })
  }

  // onSwiper([swiper]) {
  //   console.log(swiper);
  // }
  // onSlideChange() {
  //   console.log('slide change');
  // }

}
