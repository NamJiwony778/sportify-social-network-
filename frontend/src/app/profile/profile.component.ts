import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { InterestsService } from '../services/interests.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AvatarService } from '../services/avatar.service';
import { Avatar } from '../interfaces/avatar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @Input() avatarImgs;

  public modalRef: BsModalRef;
  currentUser: any;
  interests: any;
  privateInterests: any;
  submitted =false;
  updated = false;
  selectedIds = [];
  privateInterest = null;
  avatar: Avatar;
  form: FormGroup;
  data: string;
  file:any;
  message = '';

  avaPath =[];
  subscription: Subscription;

  constructor(private token: TokenStorageService, private route: ActivatedRoute, private modalService: BsModalService, private interestsService: InterestsService, private avatarService: AvatarService) {

   }

   //show user's info 
  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.getAvatar(this.currentUser.id);
    this.showPrivateInterests();

    console.log("ac" + JSON.stringify(this.currentUser));

    this.form = new FormGroup({
      image: new FormControl(null)
    });

    // this.subscription = this.avatarService.currentAvatar.subscribe(avaPath => this.avaPath = avaPath);

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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




    //show private interests in the profile
    public showPrivateInterests(){
      this.interestsService.getUserInterests(this.currentUser.id).subscribe(
        data => {
          this.privateInterests = data;
        },
        error => {
          console.log(error);
        }
      )
    } 

    public makePrivate(){
      this.token.update(this.currentUser.id, {id: this.currentUser.id, isPrivate: true}).subscribe(
          response => {
            console.log(response);
            this.updated = true;
            window.location.reload();
          },
          error => {
            console.log(error);
          });
    }

    uploadFile(event: Event) {
      console.log("File is selected!");
      this.file = (event.target as HTMLInputElement).files[0];
      console.log('file ' + JSON.stringify(this.file));
        this.form.patchValue({ image: this.file});
      const allowedMileTypes = ['image/png', 'image/jpeg', 'image/jpg'];
      if (this.file && allowedMileTypes.includes(this.file.type)) {
           const reader = new FileReader();
           reader.onload = () => {
             this.data = reader.result as string;
          } 
         reader.readAsDataURL(this.file);  
       }
    }

addAvatar() {
    console.log("aaaaa1 " + this.file);
    this.avatarService.create(this.file, this.currentUser.id);
    this.form.reset();
    this.data = null;
  }

  public reloadPage(){
    window.location.reload();
  }

  getAvatar(id): void {
    this.avatarService.get(id)
    .subscribe(
     data => {
       this.avatar = data;
       console.log("3456" + JSON.stringify(data));
    },
    error => {
      console.log(error);
      this.message = 'Details are not retrieved!';
    });
 
 }

}
