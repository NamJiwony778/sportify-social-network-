import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Activity } from '../interfaces/activity';
import { TokenStorageService } from '../services/token-storage.service';
import { Observable } from 'rxjs'

const baseUrl = 'http://localhost:3000/api/activities';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private activities: Activity[] = [];
  private  activities$ = new Subject<Activity[]>();
  readonly url = baseUrl; 

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }
  
  currentUser = this.tokenStorage.getUser();

  create(title: string, id_category: string, participants_quantity: number, start_date: Date, end_date: Date, address: string, id_host: string): void {
    const data = {
      title: title,
      id_category: id_category,
      participants_quantity: participants_quantity,
      start_date: start_date,
      end_date: end_date,
      address: address,
      id_host: this.currentUser.id
    };

     this.http
        .post<{ activity: Activity }>(this.url, data)
        .subscribe((data) => {
          const activity: Activity = {
            title: title,
            id_category: id_category,
            participants_quantity:participants_quantity,
            start_date: start_date,
            end_date: end_date,
            address: address,
            id_host: this.currentUser.id,
          };
          this.activities.push(activity);
          this.activities$.next(this.activities);
        });
    }

    getAll(): Observable<any> {
      return this.http.get(baseUrl);
    }
   
}
