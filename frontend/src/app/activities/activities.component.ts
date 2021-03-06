import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { InterestsService } from '../services/interests.service';
import { Activity } from '../interfaces/activity';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { TokenStorageService } from '../services/token-storage.service';
import { ActivityService } from '../services/activity.service';


@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {

  @Input() activities;

  logged = false;
  form: FormGroup;
  public modalRef: BsModalRef;
  categories: any;
  activity: Activity;
  data: string;
  currentUser: any;
  selectedIdCategory: any;

  constructor(private modalService: BsModalService, private interestsService: InterestsService, private tokenStorage: TokenStorageService, private activityService: ActivityService) { }

  ngOnInit(): void { 
    this.currentUser = this.tokenStorage.getUser();
    if (this.tokenStorage.getToken()) {
      this.logged= true;
    }
     
    this.form = new FormGroup({
      title: new FormControl(null),
      id_category: new FormControl(null),
      imagePath: new FormControl(null),
      participants_quantity: new FormControl(null),
      start_date: new FormControl(null),
      end_date: new FormControl(null),
      timeEvent: new FormControl(null),
      address: new FormControl(null),
    });
    this.showActivities();
  }   

    //open modal form
    public openModalForm(formAdd: TemplateRef<any>) {
      this.modalRef = this.modalService.show(formAdd); 
    }

    //show interests in modal form
    public showCategories(){
      this.interestsService.getAll().subscribe(
        data => {
          this.categories = data;
        },
        error => {
          console.log(error);
        }
      )
  }

  //add or remove selected interests to the array
  onCheckbox(e) {
    if (e.target.checked) {
      this.selectedIdCategory = e.target.value; }
  }

  uploadFile(event: Event) {
    console.log("Test File is selected!" + this.form.value.imagePath);
    const file = (event.target as HTMLInputElement).files[0];
      this.form.patchValue({ imagePath: file});
    const allowedMileTypes = ['imagePath/png', 'imagePath/jpeg', 'imagePath/jpg'];
    if (file && allowedMileTypes.includes(file.type)) {
         const reader = new FileReader();
         reader.onload = () => {
           this.data = reader.result as string;
        } 
       reader.readAsDataURL(file);  
     }
  }

  //save activity
  addActivity(){
    // console.log("dddddfghh" + this.form.value.image);
  this.activityService.create(
      this.form.value.title,
      this.form.value.id_category,
      this.form.value.imagePath,
      this.form.value.participants_quantity,
      this.form.value.start_date,
      this.form.value.end_date,
      this.form.value.timeEvent,
      this.form.value.address,
      this.currentUser.id);
      this.form.reset();
      this.data = null;
  }

  public reloadPage(){
    window.location.reload();
  }

  public showActivities(){
    this.activityService.getAll().subscribe(
      data => {
        this.activities = data; 
      },
      error => {
        console.log(error);
      }
    )
  }
}
