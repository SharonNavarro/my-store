import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { User, CreateUsertDTO } from './../models/user.model'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Hay un proxy de desarrollo para evitar problemas de CORDS
  private apiUrl = `${environment.API_URL}/api/auth`;

  constructor(
    private http: HttpClient
  ) { }

  login(email: string, password: string) {
    return this.http.post(`${this.apiUrl}/login`, {email, password});
  };

  profile(token: string) {
    return this.http.get(`${this.apiUrl}/profile`);
  };

}
