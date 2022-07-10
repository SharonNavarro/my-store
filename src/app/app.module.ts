import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { TimeInterceptor } from './interceptors/time.interceptor';
import { TokenInterceptor } from './interceptors/token.interceptor';

import { SwiperModule } from 'swiper/angular';

import { AppRoutingModule } from './app-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';

import { QuicklinkModule} from 'ngx-quicklink';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    SwiperModule,
    RouterModule,
    AppRoutingModule,
    QuicklinkModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TimeInterceptor, multi:true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi:true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

// multi: true => permite “construir” multiples dependencias para un mismo token.
//Es una forma de extender un token en particular para un objeto (provider).
//Angular utiliza esta forma para hacer hooks conectables.
