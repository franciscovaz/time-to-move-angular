import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAppRoot from '../../store/app.reducer';
import * as ProfileActions from '../../store/profile/profile.actions';

interface Profile {
  name: string;
  imgUrl: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  isProfileChangeModalOpen = true;
  profileInfo: Profile;

  constructor(
    private store: Store<fromAppRoot.AppState>
  ) { }

  ngOnInit(): void {

    this.profileInfo = {
      name: 'John Doe',
      imgUrl: 'https://github.com/franciscovaz.png'
    }


    this.store.select('profile').subscribe(state => {
      if (state.profile.name && state.profile.imgUrl) {
        console.log(state.profile.name);
        this.profileInfo = {
          name: state.profile.name,
          imgUrl: state.profile.imgUrl
        }
      }

    })
  }

  handleChangeUser() {
    console.log('Change user');
    // open modal to change name and image of user
  }

}
