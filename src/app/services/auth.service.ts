import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

import { User } from '../models/user.model';
import { Auth } from './../models/auth.model-'
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Hay un proxy de desarrollo para evitar problemas de CORDS
  private apiUrl = `${environment.API_URL}/api/auth`;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  login(email: string, password: string) {
    return this.http.post<Auth>(`${this.apiUrl}/login`, {email, password})
    .pipe(
      tap(response => this.tokenService.saveToken(response.access_token))
    );
  };

  getProfile() {
    // const hearders = new HttpHeaders();
    // hearders.set('Authorization', `Bearer ${token}`);
    return this.http.get<User>(`${this.apiUrl}/profile`, {
      // headers: {
      //   Authorization: `Bearer ${token}` ,
        // 'Content-type': 'application/json'
        // hearders
      // }
    });
  };

  loginAndGet(email: string, password: string) {
    return this.login(email, password)
    .pipe(
      switchMap(rta => this.getProfile()),
    )
  }

}
