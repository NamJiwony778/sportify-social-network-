import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Avatar } from '../interfaces/avatar';
import { Subject } from 'rxjs';


const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const baseUrl = 'http://localhost:3000/api/profilestatus';




@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {



  constructor(private http: HttpClient) { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  
  public getToken(): string {
     return sessionStorage.getItem(TOKEN_KEY);
  }
  
  public saveUser(user): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    return JSON.parse(sessionStorage.getItem(USER_KEY));
  }

  update(id, data): Observable<any> {
    return this.http.post(baseUrl, data);
  }
   
  }


