import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { io } from 'socket.io-client';
import { Chat } from '../interfaces/chat';
import { Message } from '../interfaces/message';
import { Chatparticipant } from '../interfaces/chatparticipant';
import { Subject } from 'rxjs';

import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ChatService {

socket: any;
baseUrl = 'http://localhost:3000';
private messages: Message[] = [];
private  messages$ = new Subject<Message[]>();

  constructor(private http: HttpClient, private route: ActivatedRoute, private tokenStorage: TokenStorageService) {
    this.socket = io(this.baseUrl);
   } 

  currentUser = this.tokenStorage.getUser();

  
  public sendMessage(message, idUser){
  console.log("dfdd" + message);
  console.log("qqqq " + JSON.stringify(idUser));
    this.socket.emit('chat message', {message: message, id_sender: idUser});
  }

  getMessage(): Observable<any> {
    return Observable.create( observer => {
       this.socket.on('chat message', ({message: message, id_sender: idUser}) => {
        // console.log("my message  " +JSON.stringify(message, currentUser));
        observer.next({message: message, id_sender: idUser});
      });
    });
    
  }


}
