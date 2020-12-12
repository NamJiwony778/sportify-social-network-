import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../services/activity.service';
import { InterestsService } from '../services/interests.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  privateInterests: any;
  chosenUser = null;
  message = '';

  constructor(private activityService: ActivityService, private interestsService: InterestsService, private route: ActivatedRoute,
    private userService: UserService) { }

  ngOnInit(): void {
    this.getUser(this.route.snapshot.paramMap.get('_id'));
  }

  getUser(_id): void {
    console.log("UUUU " + _id);
    this.userService.get(_id)
    .subscribe(
      data => {
        this.chosenUser = data;
        console.log(data);
     },
     error => {
       console.log(error);
       this.message = 'User details are not retrieved!';
     });
  }

}
