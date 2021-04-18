import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';

import * as fromAppRoot from '../../store/app.reducer';
import * as ProfileActions from '../../store/profile/profile.actions';


interface User {
  name: string;
  imgUrl: string;
}
@Component({
  selector: 'app-change-profile-info-modal',
  templateUrl: './change-profile-info-modal.component.html',
  styleUrls: ['./change-profile-info-modal.component.scss']
})
export class ChangeProfileInfoModalComponent implements OnInit {

  user: User;

  constructor(
    private store: Store<fromAppRoot.AppState>,
    private cookieService: CookieService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {

    this.user = {
      name: 'Francisco Vaz',
      imgUrl: 'https://github.com/franciscovaz.png'
    }

    if (this.cookieService.get('name')) {
      this.user.name = this.cookieService.get('name');
    }

    if (this.cookieService.get('imgUrl')) {
      this.user.imgUrl = this.cookieService.get('imgUrl');
    }
  }

  handleCloseProfileModal() {
    this.store.dispatch(ProfileActions.openProfileModal({ isModalOpen: false }));
  }

  handleUpdateUserInfo() {
    this.store.dispatch(ProfileActions.updateProfile({ name: this.user.name, imgUrl: this.user.imgUrl }));

    this.http.patch(`https://time-to-move-14d11-default-rtdb.firebaseio.com/users/${localStorage.getItem('user_id')}`, { name: this.user.name, imgUrl: this.user.imgUrl }).subscribe(resp => {
      console.log('update resp: ', resp);

    })
  }

  handleDiscardChanges() {
    console.log('Discard changes');
  }

}
