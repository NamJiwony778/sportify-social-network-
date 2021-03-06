import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './services/token-storage.service';
import { ActivityService } from './services/activity.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'frontend';
  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string;
  searchQuery: any;
  activitiesSearch: any;

  constructor(private tokenStorageService: TokenStorageService,  private activityService: ActivityService, public router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      
      this.username = user.username;
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  searchItem(): void {
  if(!this.searchQuery || this.searchQuery.length === 0){
    return;
  }
   this.activityService.findByCategoryUser(this.searchQuery).
   subscribe(
    data => {
      this.activitiesSearch = data;
    },
    error => {
      console.log(error);
    });
  }
}
