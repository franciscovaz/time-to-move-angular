import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

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
    private http: HttpClient
  ) { }

  ngOnInit(): void {

    this.user = {
      name: 'Francisco Vaz',
      imgUrl: 'https://github.com/franciscovaz.png'
    }

    this.http.get('https://time-tomove-v2-default-rtdb.firebaseio.com/users.json').pipe(
      map(respData => {
        let userInfo;
        for (const key in respData) {
          if (respData[key].email === localStorage.getItem('email')) {
            return respData[key];
          }
        }
        return userInfo;
      })).subscribe(user => {
        this.user.name = user.name;
        this.user.imgUrl = user.imgUrl;
      });


    this.store.select('profile').subscribe(data => {
      this.user.name = data.profile.name;
      this.user.imgUrl = data.profile.imgUrl;
    })
  }

  handleCloseProfileModal() {
    this.store.dispatch(ProfileActions.openProfileModal({ isModalOpen: false }));
  }

  handleUpdateUserInfo() {
    this.store.dispatch(ProfileActions.updateProfile({ name: this.user.name, imgUrl: this.user.imgUrl }));

    this.http.patch(`https://time-tomove-v2-default-rtdb.firebaseio.com/users/${localStorage.getItem('user_id')}.json`, { name: this.user.name, imgUrl: this.user.imgUrl }).subscribe(resp => {
      // console.log('update resp: ', resp);
    });
  }

  handleDiscardChanges() {
    console.log('Discard changes');
  }

}
