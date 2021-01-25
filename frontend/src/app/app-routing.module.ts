import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { ActivityDetailsComponent } from './activity-details/activity-details.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SendEmailComponent } from './send-email/send-email.component';
import { ChatComponent } from './chat/chat.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: 'activities/:_id', component: ActivityDetailsComponent },
  { path: 'user-profile/:_id', component: UserProfileComponent },
  { path: 'user-email/:_id', component: SendEmailComponent },
  { path: 'chat', component: ChatComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
