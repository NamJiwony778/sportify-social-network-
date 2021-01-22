import { Component, OnInit } from '@angular/core';
import { EmailService } from '../services/email.service';
import { TokenStorageService } from '../services/token-storage.service';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})

export class BoardUserComponent implements OnInit {
  template: any;
  currentUser: any;
  emails: any;
  email:any;
  form: FormGroup;
  sentEmail: any;
  data: any;
  
  id: any;
  message = '';
  destination = null;
  isShownList = false;
  showMessage = false;
  showAnswerForm = false;
  showSentEmail = false;
  isRead = false;
  boldTitle: any;
  boldText: any;

  constructor(private emailService: EmailService, private token: TokenStorageService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.getEmails();

    this.form = new FormGroup({
      message: new FormControl(null),
    });
  }

  getEmails(){
    this.emailService.getUserIEmails(this.currentUser.id).subscribe(
      data => {
        this.emails = data;
        console.log("Email" + JSON.stringify(data));
      },
      error => {
        console.log(error);
      }
    )
  }

  showReceivedEmails(){
    this.isShownList = true;
    this.showSentEmail = false;
  
  }

  showSentEmails(){
    this.showSentEmail = true;
    this.isShownList = false;
  }

  showEmail(){
    this.showMessage = true;
  }

  hideEmail(){
    this.showMessage = false;
  }

  showAnswerArea(){
    this.showAnswerForm = true;
  }
  
  answerEmail(id){
    this.emailService.create(
      this.emails.id,
      id,
      this.emails.title,
      this.form.value.message,
      this.isRead
      );
      this.form.reset();
      this.data = null;
      this.showAnswerForm = false;
  }
}
