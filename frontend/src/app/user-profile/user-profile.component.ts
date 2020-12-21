import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  
  destinationUser: any;
  chosenUser = null;
  message = '';

  constructor( private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    this.getUser(this.route.snapshot.paramMap.get('_id'));
    
    
  }

  getUser(_id): void {
    this.userService.get(_id)
    .subscribe(
      data => {
        this.chosenUser = data;
        this.userService.currentUser.subscribe(destinationUser => this.destinationUser = this.chosenUser);
        this.getDestination();
        console.log(data);
     },
     error => {
       console.log(error);
       this.message = 'User details are not retrieved!';
     });
  }

  getDestination(){
    this.userService.getChosenUser(this.destinationUser)
  }

}
