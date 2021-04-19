import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
  level$: Observable<number>;

  constructor(
    private store: Store<fromAppRoot.AppState>,
  ) { }

  ngOnInit(): void {

    this.profileInfo = {
      name: 'John Doe',
      imgUrl: 'https://github.com/franciscovaz.png',
      isProfileChangeModalOpen: false
    }


    this.store.select('profile').subscribe(state => {
      console.log('Profile name: ', state);

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


    });

    this.level$ = this.store.select('challenge').pipe(
      map(data => data.challenge.level)
    );




  }

  handleChangeUser() {
    this.store.dispatch(ProfileActions.openProfileModal({ isModalOpen: true }));
  }

}
