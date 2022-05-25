import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent = "";
  showImg = true;

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  register = {
    name: '',
    email: '',
    password: '',
  };

  token!: string;

  onRegister() {
    console.log(this.register)
  };

  onLoaded(img: string) {
    console.log("log padre", img)
  };

   toggleImg() {
    this.showImg = !this.showImg;
   };

   createUser() {
     this.usersService.create({
       email: 'anyo@mail.com',
       name: 'Anyo',
       password: '12345'
     })
     .subscribe( rta => {
       console.log(rta);
     });
   };

}
