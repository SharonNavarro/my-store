import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ImgComponent } from '../shared/components/img/img.component';
import { ProductComponent } from '../shared/components/product/product.component';
import { ProductsComponent } from '../shared/components/products/products.component';

import { ReversePipe } from '../shared/pipes/reverse.pipe';
import { TimeAgoPipe } from '../shared/pipes/time-ago.pipe';

import { HighlightDirective } from '../shared/directives/highlight.directive';

import { SwiperModule } from 'swiper/angular';

@NgModule({
  declarations: [
    ImgComponent,
    ProductComponent,
    ProductsComponent,
    ReversePipe,
    TimeAgoPipe,
    HighlightDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    SwiperModule
  ],
  exports: [
    ImgComponent,
    ProductComponent,
    ProductsComponent,
    ReversePipe,
    TimeAgoPipe,
    HighlightDirective
  ]
})
export class SharedModule { }
