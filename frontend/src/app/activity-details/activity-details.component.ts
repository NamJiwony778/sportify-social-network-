import { Component, OnInit, TemplateRef } from '@angular/core';
import { Location } from '@angular/common';
import { ActivityService } from '../services/activity.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { InterestsService } from '../services/interests.service';
import { TokenStorageService } from '../services/token-storage.service';
import { ParticipantsService } from '../services/participants.service';

@Component({
  selector: 'app-activity-details',
  templateUrl: './activity-details.component.html',
  styleUrls: ['./activity-details.component.css']
})
export class ActivityDetailsComponent implements OnInit {
  activity = null;
  message = '';
  public modalRef: BsModalRef;
  updated = false;
  currentUser: any;
  host = false;
  submitted =false;
  participants: any;

  constructor(private route: ActivatedRoute, private activityService: ActivityService, 
    private modalService: BsModalService, private interestsService: InterestsService,
    private location: Location,
    private router: Router, private tokenStorage: TokenStorageService,
    private participantsService: ParticipantsService) { }

  ngOnInit(): void {
    this.currentUser = this.tokenStorage.getUser();
    console.log("CU "+ this.currentUser.id);

    this.getActivity(this.route.snapshot.paramMap.get('_id'));
    // this.showOrHideButtons();
  this.showParticipants();
  }



  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template); 
  }

  getActivity(_id): void {
     this.activityService.get(_id)
     .subscribe(
      data => {
        this.activity = data;
        console.log(data);
      //   if(this.currentUser.id !=  this.activity.id_host._id && this.activity.participants_quantity <= this.participants.length){
    
      //     this.host = true;
      this.showParticipants();
     },
     error => {
       console.log(error);
       this.message = 'Details are not retrieved!';
     });
  
  }

//   public showOrHideButtons() {
//     if(this.currentUser.id !=  this.activity.id_host._id){
    
//        this.host = true;
//     }
//     console.log("2 "+ this.currentUser.id);
//     console.log("iiii " + this.activity.id_host._id);
//  }

updateActivity(): void {
  this.activityService.update(this.activity._id, this.activity)
    .subscribe(
      response => {
        console.log(response);
        this.updated = true;
        window.location.reload();
      },
      error => {
        console.log(error);
      });
}

deleteActivity(): void {
  this.activityService.delete(this.activity._id)
    .subscribe(
      response => {
        console.log(response);
        this.router.navigate(['/home']);
      },
      error => {
        console.log(error);
      });
    }

    participateInActivity(): void {
      const data = {
        id_user: this.currentUser.id,
        id_activity: this.activity._id
      };
  
    console.log(data);
   this.participantsService.create(data)
   .subscribe(
     responce => {
       console.log(responce);
       this.submitted = true;
     },
     error => {
       console.log(error);
     });   

    }
    
    
    public showParticipants(){
      this.participantsService.getAll().subscribe(
        data => {
          this.participants = data;
          console.log("showParticipants()" + JSON.stringify(data));
          console.log("LLL" + this.participants.length);
          // if(this.currentUser.id !=  this.activity.id_host._id && this.activity.participants_quantity <= this.participants.length){
 
        },
        error => {
          console.log(error);
        }
      )
    }

}
