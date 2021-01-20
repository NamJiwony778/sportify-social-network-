import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Activity } from '../interfaces/activity';
import { TokenStorageService } from '../services/token-storage.service';
import { Observable } from 'rxjs';

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
 

  create(title: string, id_category: string, image: File, participants_quantity: number, start_date: Date, end_date: Date, timeEvent: string, address: string, id_host: string): void {
    const data: any  = new FormData();
    console.log("Image file in create():", image);
    console.log("Image file name in create():", image.name);

    data.append("title", title);
    data.append("id_category", id_category);
    data.append("image", image);
    data.append("participants_quantity", participants_quantity);
    data.append("start_date", start_date);
    data.append("end_date", end_date);
    data.append("timeEvent", timeEvent);
    data.append("address", address);
    data.append("id_host", this.currentUser.id);

    

     this.http
        .post<{ activity: Activity }>(this.url, data)
        .subscribe((data) => {
          const activity: Activity = {
            title: title,
            id_category: id_category,
            imagePath: image.name,
            participants_quantity:participants_quantity,
            start_date: start_date,
            end_date: end_date,
            timeEvent: timeEvent,
            address: address,
            id_host: this.currentUser.id,
          };
          console.log('img ' + image.name);
          this.activities.push(activity);
          this.activities$.next(this.activities);
        });
    }

    getAll(): Observable<any> {
      return this.http.get(baseUrl);
    }

    get(id): Observable<any> {
      return this.http.get(`${baseUrl}/${id}`);
    }
   
    update(id, data): Observable<any> {
      return this.http.put(`${baseUrl}/${id}`, data);
    }

    delete(id): Observable<any> {
      return this.http.delete(`${baseUrl}/${id}`);
    }
    
    findByCategoryUser(searchQuery): Observable<any> {
      console.log(searchQuery);
      return this.http.get(`${baseUrl}?searchQuery=${searchQuery}`);
    }
   
}
