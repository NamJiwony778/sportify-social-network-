import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:3000/api/auth/';

const httpOptions = {
      headers: new HttpHeaders({ 'Access-Control-Allow-Origin': 'http://localhost:3000/', 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(credentials): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      email: credentials.email,
      password: credentials.password
    }, httpOptions);
  }

  register(user): Observable<any> {
    console.log(user);
    return this.http.post(AUTH_API + 'signup', {
      first_name: user.first_name,
      last_name: user.last_name,
      avatar: 'http://localhost:3000/uploads/avatar.jpg',
      email: user.email,
      password: user.password,
      isPrivate: false
    }, httpOptions);
  }
}
