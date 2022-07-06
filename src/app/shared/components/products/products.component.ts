import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product, createProductDTO, updateProductDTO } from '../../../models/product.model'
import { StoreService } from 'src/app/services/store.service';
import { ProductsService } from 'src/app/services/products.service';
import { switchMap, zip } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  myShoppingCart: Product[] = [];
  total = 0;
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
  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';

  @Output() onLoadMore: EventEmitter<string> = new EventEmitter<string>();
  @Input() set productId(id: string | null) {
    if(id) {
      this.onShowProduct(id);
    }
  }
  @Input() products: Product[] = [];

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    //lo ponemos aqui ya que no es asincrono
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  // https://picsum.photos/200

  onAddToShppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();

    console.log(this.myShoppingCart)
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  onShowProduct(id: string) {
    this.statusDetail = 'loading';
    if (!this.showProductDetail) {
      this.showProductDetail = true;
    }
    this.productsService.getProduct(id)
      .subscribe({
        next: data => {
          this.productChosen = data;
          this.statusDetail = 'success';
        },
        error: error => {
          this.statusDetail = 'error';
        }
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
    this.onLoadMore.emit();
  };

  //SwitchMap nos permite hacer lo mismo que un .then en una promesa y asi poder evitar el callbackHell
  //Zip funciona como una promise.all, resuelve en conjunt promesas y en orden cronologico
  readAndUpdate(id: string) {
    this.productsService.getProduct(id)
    .pipe(
      switchMap((product) => this.productsService.update(product.id, {title: 'change'}))
    )
    .subscribe(data => {
      console.log(data)
    });
    zip(
      this.productsService.getProduct(id),
      this.productsService.update(id, {title: 'change2'})
    )
    .subscribe(response => {
      const read = response[0];
      const update = response[1];
    })
  }

}
