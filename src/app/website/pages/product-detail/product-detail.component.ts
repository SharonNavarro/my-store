import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { switchMap } from 'rxjs/operators'

import { ProductsService } from 'src/app/services/products.service';

import { Product } from '../../../models/product.model'

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  productId: string | null = null;
  product: Product | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService,
    private location: Location
  ) { }

  ngOnInit(): void {

    this.route.paramMap
    .pipe(
      switchMap(params => {
        this.productId = params.get('id');
        if (this.productId) {
          return this.productsService.getProduct(this.productId)
        }
        return [null];
      })
    )
    .subscribe((data) => {
      this.product = data;
    })
  }

  goToBack() {
    // this.location.back();
    this.router.navigate(["/home"])
  }

}
