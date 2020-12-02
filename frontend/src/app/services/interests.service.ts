import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:3000/api/';
const interestsURL = baseUrl + 'interests';
const privateInterestsURL = baseUrl + 'privateinterests';

@Injectable({
  providedIn: 'root'
})
export class InterestsService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(interestsURL);
  }
  
  getUserInterests(id): Observable<any> {
    return this.http.get(`${privateInterestsURL}/${id}`)
  }

  create(data): Observable<any> {
    return this.http.post(privateInterestsURL, data);
  }
}
