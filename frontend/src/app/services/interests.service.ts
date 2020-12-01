import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:3000/api/interests';
const url = 'http://localhost:3000/api/privateinterests';

@Injectable({
  providedIn: 'root'
})
export class InterestsService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(baseUrl);
  }
  
  get(id): Observable<any> {
    return this.http.get(`${url}/${id}`)
  }

  create(data): Observable<any> {
    return this.http.post(url, data);
  }
}
