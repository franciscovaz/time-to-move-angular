import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

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
    private store: Store<fromAppRoot.AppState>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(ProfileActions.getProfile());

    this.user = {
      name: 'Francisco Vaz',
      imgUrl: 'https://github.com/franciscovaz.png'
    }
  }

  handleCloseProfileModal() {
    console.log('close modal');

  }

  handleUpdateUserInfo() {
    console.log('Update user info');
  }

  handleDiscardChanges() {
    console.log('Discard changes');
    // for now, just close it!
  }

}
