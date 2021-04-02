import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Profile } from 'src/app/store/profile/profile.module';
import * as fromAppRoot from '../../store/app.reducer';
import * as ProfileActions from '../../store/profile/profile.actions';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  isProfileChangeModalOpen = false;
  profileInfo: Profile;

  constructor(
    private store: Store<fromAppRoot.AppState>
  ) { }

  ngOnInit(): void {

    this.profileInfo = {
      name: 'John Doe',
      imgUrl: 'https://github.com/franciscovaz.png',
      isProfileChangeModalOpen: false
    }


    this.store.select('profile').subscribe(state => {
      if (state.profile.name && state.profile.imgUrl) {
        this.profileInfo = {
          name: state.profile.name,
          imgUrl: state.profile.imgUrl,
          isProfileChangeModalOpen: state.profile.isProfileChangeModalOpen
        }
      }
      if (state.profile.isProfileChangeModalOpen || state.profile.isProfileChangeModalOpen === false) {
        this.profileInfo = {
          name: state.profile.name,
          imgUrl: state.profile.imgUrl,
          isProfileChangeModalOpen: state.profile.isProfileChangeModalOpen
        }
      }

    })

  }

  handleChangeUser() {
    this.store.dispatch(ProfileActions.openProfileModal({ isModalOpen: true }));
  }

}
