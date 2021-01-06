import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild,  OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';
import { ChatService } from '../services/chat.service';
import { Observable, Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { Message } from '../interfaces/message';
import { FormGroup, FormControl } from '@angular/forms';
// import { io } from "socket.io-client/build/index";
import { io } from "socket.io-client";
import { getAttrsForDirectiveMatching } from '@angular/compiler/src/render3/view/util';

 const socket_endpoint = 'http://localhost:3000';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

 form: FormGroup;
//  messages = document.getElementById('messages');
 messages: any;
 messageList:  string[] = [];

  constructor(private chatService: ChatService, private route: ActivatedRoute, private token: TokenStorageService) {
   }
 

  ngOnInit(): void {
   this.form = new FormGroup({
      message: new FormControl(null),
   });

   this.getMsg();
  }

  sendMsg() {
    this.chatService.sendMessage(
      this.form.value.message
    );
    this.form.reset();
    }

    getMsg() {
    this.chatService.getMessage().subscribe(
      data => {
        this.messageList.push(data);
        console.log('vvvv ' + data);
      },
      error => {
        console.log(error);
      }
    
    )
   
    // var item = document.createElement('li') 
    // item.textContent = data;
    // this.messages.appendChild(item);
    // window.scrollTo(0, document.body.scrollHeight);   
    }
  }


  




