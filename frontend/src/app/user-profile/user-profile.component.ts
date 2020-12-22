import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  
  destinationUser: any;
  chosenUser = null;
  message = '';
  currentUser: any;
  submitted =false;

  constructor( private route: ActivatedRoute, private userService: UserService, private token: TokenStorageService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
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

  followUser(_id): void  {
    console.log("IDIIII" + _id);
    const data = {
      id_user: this.currentUser.id,
      id_following:_id
    };

    this.userService.create(data)
    .subscribe(
      responce => {
        console.log(responce);
        this.submitted = true;
       
      },
      error => {
        console.log(error);
      }
    );   
  }

  public reloadPage(){
    window.location.reload();
  }

}
