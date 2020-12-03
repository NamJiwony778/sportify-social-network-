import { Component, OnInit, TemplateRef } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { InterestsService } from '../services/interests.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public modalRef: BsModalRef;

  currentUser: any;
  interests: any;
  privateInterests: any;
  submitted =false;

  selectedIds = [];

  constructor(private token: TokenStorageService, private modalService: BsModalService, private interestsService: InterestsService) {

   }

   //show user's info 
  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.showPrivateInterests();
  }
  
  //open modal form
  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template); 
  }

  //show interests in modal form
  public showInterests(){
    this.interestsService.getAll().subscribe(
      data => {
        this.interests = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    )
  }

  //add or remove selected interests to the array
  onCheckboxChange(e) {
    var value = e.target.value
    if (e.target.checked) {
      this.selectedIds.push(value);
    }else {
      var index = this.selectedIds.indexOf(value);
      if(index >= 0) {
        this.selectedIds.splice(index);
      }
    }
    console.log(this.selectedIds);
  }

  savePrivateInterest(): void {
      const data = {
        id_user: this.currentUser.id,
        id_interest: this.selectedIds
      };
  
    console.log(data);
   this.interestsService.create(data)
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

    //show private interests in the profile
    public showPrivateInterests(){
      this.interestsService.getUserInterests(this.currentUser.id).subscribe(
        data => {
          this.privateInterests = data;
          console.log("PI" + data);
         
        },
        error => {
          console.log(error);
        }
      )
    }
}
