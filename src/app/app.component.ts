import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent = "";
  // https://picsum.photos/200

  register = {
    name: '',
    email: '',
    password: '',
  }

  onRegister() {
    console.log(this.register)
  }

}
