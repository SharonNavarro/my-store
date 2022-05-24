import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { User, CreateUsertDTO } from './../models/user.model'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
}
