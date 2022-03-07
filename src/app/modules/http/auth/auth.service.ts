import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  business: string = environment.business;
  public token;
  constructor(public http: HttpClient) {}

  logIn(data) {
    return this.http.post(this.business + '/login', data, this.getHeaders());
  }

  logOut() {
    return this.http.delete(this.business + '/logout', {
      body: { token: localStorage.getItem('Token') },
    });
  }

  getHeaders() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return httpOptions;
  }
}
