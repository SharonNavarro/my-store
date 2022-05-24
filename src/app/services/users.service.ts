import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { User, CreateUsertDTO } from './../models/user.model'

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  // Hay un proxy de desarrollo para evitar problemas de CORDS
  private apiUrl = `${environment.API_URL}/api/products`;

  constructor(
    private http: HttpClient
  ) { }

  create(dto: CreateUsertDTO) {
    return this.http.post(this.apiUrl, dto);
  };

  getAll() {
    return this.http.get<User[]>(this.apiUrl);
  }
}
