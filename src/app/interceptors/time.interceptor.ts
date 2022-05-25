import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class TimeInterceptor implements HttpInterceptor {

  constructor() {}
  //El interceptor se inyecta manualmente en el app.module
  //El interceptor hace efecto en todas las peticiones
  //Tap nos deja correr un proceso sin cambiar o modificar la respuesta del observable
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const start = performance.now();
    return next
    .handle(request)
    .pipe(
      tap(() => {
        const time = (performance.now() - start) + 'ms';
        console.log(request.url, time);
      })
    );
  }
}
