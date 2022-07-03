import { Component, OnInit } from '@angular/core';

import { StoreService } from '../../services/store.service'
import { AuthService } from '../../services/auth.service';
import { CategoriesService } from '../../services/categories.service';

import { User } from '../../models/user.model';

import { switchMap } from 'rxjs';
import { Category } from 'src/app/models/product.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  activeMenu = false;
  counter = 0;
  profile: User | null = null;
  categories: Category[] = [];

  constructor(
    private storeService: StoreService,
    private authService: AuthService,
    private categoriesService: CategoriesService
  ) { }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    });
    this.getAllCategories();
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  login() {
    this.authService.loginAndGet('anyo@mail.com', '12345')
    .subscribe(user => {
      this.profile = user;
    });
  }

  getAllCategories() {
    this.categoriesService.getAll()
    .subscribe(data => {
      this.categories = data;
    })
  }

  // login() {
  //   this.authService.login('anyo@mail.com', '12345')
  //     .pipe(
  //       switchMap((token) => {
  //         this.token = token.access_token;
  //         return this.authService.getProfile(token.access_token);
  //       })
  //     )
  //     .subscribe(user => {
  //       this.profile = user;
  //     });
  // };

}
