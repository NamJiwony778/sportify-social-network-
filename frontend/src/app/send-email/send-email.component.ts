import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmailService } from '../services/email.service';
import { UserService } from '../services/user.service';
import { TokenStorageService } from '../services/token-storage.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css']
})
export class SendEmailComponent implements OnInit {
  
  currentUser: any;
  destinationUser: any;
  destination = null;
  message = '';
  form: FormGroup;
  data: any;
  isRead: any;

  constructor(private route: ActivatedRoute, private emailService: EmailService, private userService: UserService, private token: TokenStorageService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.destination = this.route.snapshot.paramMap.get('_id');
    console.log("Destination " + this.destination);
    this.userService.currentUser.subscribe(destinationUser => this.destinationUser = destinationUser);
    console.log("ID " + JSON.stringify(this.destinationUser));

    this.form = new FormGroup({
      title: new FormControl(null),
      message: new FormControl(null),
    });
 
  }

  sendEmail() {
     this.emailService.create(
      this.currentUser._id,
      this.destination,
      this.form.value.title,
      this.form.value.message,
      this.isRead
      );
      this.form.reset();
      this.data = null;
  }



}

