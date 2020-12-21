import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Email } from '../interfaces/email';
import { Subject } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';

const baseUrl = 'http://localhost:3000/api/sendemail'

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private emails: Email[] = [];
  private  emails$ = new Subject<Email[]>();
  readonly url = baseUrl; 
  constructor(private http: HttpClient, private tokenStorage: TokenStorageService, private route: ActivatedRoute) { }
  
  currentUser = this.tokenStorage.getUser();
  // destination = this.route.snapshot.paramMap.get('_id');

  create(id_sender: string, id_receiver: string, title: string, message:string, isRead: boolean): void {
    const data = {
      id_sender: this.currentUser.id,
      id_receiver: id_receiver,
      title: title,
      message: message,
      isRead: false
    };
    
    console.log('DATA ' + JSON.stringify(data));
    this.http.post<{ email: Email }>(this.url, data)
    .subscribe((data) => {
      const email: Email = {
      id_sender: id_sender,
      id_receiver: id_receiver,
      title: title,
      message: message,
      isRead: false
      };
      this.emails.push(email);
      this.emails$.next(this.emails);
    });
  }

  getUserIEmails(id): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`)
  }
}
