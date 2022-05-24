import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Product, createProductDTO, updateProductDTO } from './../models/product.model'
import { environment } from 'src/environments/environment';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  // Hay un proxy de desarrollo para evitar problemas de CORDS
  private apiUrl = `${environment.API_URL}/api/products`;

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts(limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit && offset) {
      params = params.set('limit', limit);
      params = params.set('offset', limit);
    }
    return this.http.get<Product[]>(this.apiUrl, { params })
    .pipe(
      retry(4)
    );
  }

  getProduct(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.Conflict) {
          return throwError(() => ('Algo esta fallando en el server'));
        }
        if (error.status === 404) {
          return throwError(() => ('El producto no existe'));
        }
        if (error.status === HttpStatusCode.Unauthorized) {
          return throwError(() => ('No estas autorizado'));
        }
        return throwError(() => ('Ups algo salió mal'));
      })
    );
  }

  getProductsByPage(limit: number, offset: number) {
    return this.http.get<Product[]>(`${this.apiUrl}`, {
      params: { limit, offset }
    })
  }

  // DATA TRANSFER OBJECT
  create(dto: createProductDTO) {
    return this.http.post<Product>(this.apiUrl, dto);
  }

  // PUT: se deberia enviar toda la informacion del producto asi se haya cambiado solo el titulo.
  // PATCH: Hacer la edicion de un atributo en particular. Si modificamos solo el titulo solo enviamos el titulo.
  // La funcionalidad de PUT y PATCH dependera del backend

  update(id: string, dto: updateProductDTO) {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, dto);
  }

  delete(id: string) {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
