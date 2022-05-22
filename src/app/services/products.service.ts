import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product, createProductDTO, updateProductDTO } from './../models/product.model'

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = "https://young-sands-07814.herokuapp.com/api/products"

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts() {
    return this.http.get<Product[]>(this.apiUrl)
  }

  getProduct(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`)
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
}
