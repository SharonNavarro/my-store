import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { retry } from 'rxjs/operators';
import { Product, createProductDTO, updateProductDTO } from './../models/product.model'

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = '/api/products';

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
