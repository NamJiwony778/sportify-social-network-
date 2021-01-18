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
  isRead: any;
  id: any;
  message = '';
  destination = null;
  isShownList = false;
  showMessage = false;
  showAnswerForm = false;
  showSentEmail = false;

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

  // showReceivedEmails(){
  //   let showEmails = document.getElementById("template");
  //   if (showEmails.style.display === "none") {
  //     showEmails.style.display = "block";
  //   } else {
  //     showEmails.style.display = "none";
  //   }
  // }

  showSentEmails(){
    this.showSentEmail = true;
    this.isShownList = false;
  }

  // showSentEmails(){
  //   let showEmails = document.getElementById("sentEmail");
  //   if (showEmails.style.display === "none") {
  //     showEmails.style.display = "block";
  //   } else {
  //     showEmails.style.display = "none";
  //   }
  // }
 
  // showEmail(){
  //   let classElement = document.getElementsByClassName("collapsible");
  //   let i;
  //   for (i = 0; i < classElement.length; i++) {
  //     classElement[i].addEventListener("click", function() {
  //       this.classList.toggle("active");
  //       var card = this.nextElementSibling;
  //       if (card.style.display === "block") {
  //         card.style.display = "none";
  //       } else {
  //         card.style.display = "block";
  //       }
  //     });

  //   }
  // }

  showEmail(){
    this.showMessage = true;
  }

  hideEmail(){
    this.showMessage = false;
  }

  // hideEmail(){
  //   let hideEmail = document.getElementById("collapseEmail");
  //   if (hideEmail.style.display === "none") {
  //     hideEmail.style.display = "block";
  //   } else {
  //     hideEmail.style.display = "none";
  //   }
  // }
  showAnswerArea(){
    this.showAnswerForm = true;
  }
  // showAnswerArea(){
  //   console.log("Ivoke");
  //    let showForm = document.getElementsByClassName("collapsibleForm");
  //    let i;
  //   for (i = 0; i < showForm.length; i++) {

  //   showForm[i].addEventListener("click", function() {
  //  this.classList.toggle("active");
  //      var card = this.nextElementSibling;

  //       if (card.style.display === "none") {
  //         card.style.display = "block";
  //       } else {
  //         card.style.display = "none";
  //       }
  //     });

  //   }
    // if (showForm.style.display === "none") {
    //   showForm.style.display = "block";
    // } else {
    //   showForm.style.display = "none";
    // }
    // }
  // }
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
