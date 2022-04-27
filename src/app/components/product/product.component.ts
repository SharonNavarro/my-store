import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  product = {
    name: 'Product 1',
    image: '../../../assets/toy.jpg',
    price: 100
  }

  constructor() { }

  ngOnInit(): void {
  }

}
