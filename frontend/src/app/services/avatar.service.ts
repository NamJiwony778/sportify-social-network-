import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Avatar } from '../interfaces/avatar';
import { TokenStorageService } from '../services/token-storage.service';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:3000/api/avatar';

@Injectable({
  providedIn: 'root'
})



export class AvatarService {

  private avatarImgs: Avatar[] = [];
  private  avatarImgs$ = new Subject<Avatar[]>();
  readonly   urlAvatar = 'http://localhost:3000/api/avatar';


  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }

  currentUser = this.tokenStorage.getUser();

  create(image: File, id_user: string): void {
    const data: any  = new FormData();
    data.append("image", image);
    data.append("id_user", this.currentUser.id);
    
    this.http
    .post<{ avatarImg: Avatar}>(this.urlAvatar, data)
    .subscribe((data) => {
      const avatar: Avatar = {
        avatarPath: image.name,
        id_user: this.currentUser.id,
      };
      this.avatarImgs.push(avatar);
      this.avatarImgs$.next(this.avatarImgs);
    });
}

 get(id): Observable<any> {
  return this.http.get(`${baseUrl}/${id}`);
 }
}
