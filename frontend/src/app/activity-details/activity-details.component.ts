import { Component, OnInit, TemplateRef } from '@angular/core';
import { Location } from '@angular/common';
import { ActivityService } from '../services/activity.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { InterestsService } from '../services/interests.service';
import { DomSanitizer } from '@angular/platform-browser';


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
  

  constructor(private route: ActivatedRoute, private activityService: ActivityService, 
    private modalService: BsModalService, private interestsService: InterestsService,
    private location: Location,
    private router: Router, ) { }

  ngOnInit(): void {
    this.getActivity(this.route.snapshot.paramMap.get('_id'));
  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template); 
  }

  getActivity(_id): void {
     this.activityService.get(_id)
     .subscribe(
      data => {
        this.activity = data;
     },
     error => {
       console.log(error);
       this.message = 'Details are not retrieved!';
     });
  }



updateActivity(): void {
  this.activityService.update(this.activity._id, this.activity)
    .subscribe(
      response => {
        console.log(response);
        this.updated = true;
        window.location.reload();
        // this.router.navigate(['/activities/:_id']); 
      },
      error => {
        console.log(error);
      });
}

// public reloadPage(){
//   window.location.reload();
// }

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

// goBack(): void {
//   this.location.back();
// }

}
