import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL= 'http://localhost:4200'

  constructor(private http: HttpClient) { }

  singIn(user: { email: string; password: string; }) {
    return this.http.post<any>(this.URL + '/ingresar', user);
  }
}
