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
 messageList:  string[] = [];
 showMessage = false;
 currentUser: any;

  constructor(private chatService: ChatService, private route: ActivatedRoute, private token: TokenStorageService) {
   }
 

  ngOnInit(): void {
   this.currentUser = this.token.getUser();

   this.form = new FormGroup({
      message: new FormControl(null),
   });
   this.getMsg();
  }

  sendMsg() {
    this.chatService.sendMessage(
      this.form.value.message,
      this.currentUser.id,
    );
    this.form.reset();
    }

    getMsg() {
    this.chatService.getMessage().subscribe(
      data => {
        this.messageList.push(data);
        console.log('vvvv ' + JSON.stringify(data));
        console.log('b ' + this.currentUser.id);
        // this.showMessage = true;
        //  let showmessages = document.getElementById("msg");
        // if (this.currentUser.id === data.id_sender._id) {
         
        //   showmessages.style.float = "right";
          // showmessages.style.margin = "-80%";
          //  showmessages.style.padding= "5%";
        //  }

      },
      error => {
        console.log(error);
      }
    
    )
    }}

  //   addStyle(){
  //     let showmessages = document.getElementById("msg");
    
  //     for (var msg in this.messageList) {
  //       if (this.currentUser.id) {
  //         showmessages.style.float = "right";
  //       } else {
  //         showmessages.style.float= "left";
  //       }
  //     }
  //   }
  // }


  




