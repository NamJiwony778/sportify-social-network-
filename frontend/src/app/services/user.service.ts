import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Avatar } from '../interfaces/avatar';

const API_URL = 'http://localhost:3000/api/test/';
const baseUrl = 'http://localhost:3000/api/userprofile'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSource = new BehaviorSubject('default');
  currentUser = this.userSource.asObservable();
  readonly url = baseUrl; 

  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text'});
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', {responseType: 'text'});
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', {responseType: 'text'});
  }

  get(id): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  getChosenUser(destinationUser: any){
    this.userSource.next(destinationUser);
  }

  create(data): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  createAvatar(avatar: File): void {
    const data: any  = new FormData();
    data.append("avatar", avatar);
    console.log("aaa " + avatar);

    this.http
    .post(this.url, data)
      console.log('img ' + avatar.name);
      // this.activities.push(activity);
      // this.activities$.next(this.activities);
   
  }
}
