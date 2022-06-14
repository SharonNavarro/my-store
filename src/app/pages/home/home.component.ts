import { Component, OnInit } from '@angular/core';
import { Product, createProductDTO, updateProductDTO } from '../../models/product.model'
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  products: Product[] = [];
  limit = 10;
  offset = 0;

  constructor(
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.productsService.getAll(10, 0)
      .subscribe(data => {
        this.products = data;
        this.offset += this.limit;
      })
  }

  loadMore(): void {
    this.productsService.getAll(this.limit, this.offset)
      .subscribe(data => {
        this.products = this.products.concat(data.filter(product => product.images.length > 0));
        this.offset += this.limit;
      });
  };

}
