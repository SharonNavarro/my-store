import { Component, OnInit } from '@angular/core';
import { Product, createProductDTO, updateProductDTO } from '../../models/product.model'
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
  };
  limit = 10;
  offset = 0;

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    //lo ponemos aqui ya que no es asincrono
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    this.productsService.getProductsByPage(10, 0)
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
    this.productsService.getProduct(id)
    .subscribe(data => {
      this.toggleProductDetail()
      this.productChosen = data;
    })
  }

  createNewProduct() {
    const product: createProductDTO = {
      title: "Nuevo producto",
      description: "bla bla bla",
      images: ["https://placeimg.com/640/480/any?random=${Math.random()}"],
      price: 1000,
      categoryId: 2,
    }
    this.productsService.create(product)
    .subscribe(data => {
      this.products.unshift(data);
    })
  }

  updateProduct() {
    const changes: updateProductDTO = {
      title: "Nuevo titulo",
    }
    const id = this.productChosen.id;
    this.productsService.update(id, changes)
    .subscribe(data => {
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
      this.products[productIndex] = data;
    })
  }

  deleteProduct() {
    const id = this.productChosen.id;
    this.productsService.delete(id)
    .subscribe(() => {
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
      this.products.splice(productIndex, 1);
      this.showProductDetail = false;
    })
  }

  loadMore() {
    this.productsService.getAllProducts(this.limit, this.offset)
    .subscribe(data => {
      this.products = [...this.products, ...data];
      this.offset += this.limit;
    });
  }

}
