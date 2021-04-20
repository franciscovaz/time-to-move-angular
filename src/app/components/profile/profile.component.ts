import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Profile } from 'src/app/store/profile/profile.module';
import * as fromAppRoot from '../../store/app.reducer';
import * as ProfileActions from '../../store/profile/profile.actions';
import * as ChallengeActions from '../../store/challenge/challenge.actions';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  isProfileChangeModalOpen = false;
  profileInfo: Profile;
  //level$: Observable<number>;
  level: number;

  constructor(
    private store: Store<fromAppRoot.AppState>,
    private http: HttpClient
  ) { }

  ngOnInit(): void {

    this.profileInfo = {
      name: '',
      imgUrl: '',
      isProfileChangeModalOpen: false
    }


    this.http.get('https://time-to-move-14d11-default-rtdb.firebaseio.com/users.json').pipe(
      map(respData => {
        let userInfo;
        for (const key in respData) {
          if (respData[key].email === localStorage.getItem('email')) {
            return respData[key];
          } else {
            userInfo = {
              name: 'John Doe',
              imgUrl: 'https://github.com/franciscovaz.png',
              isProfileChangeModalOpen: false
            }
          }

        }
        return userInfo;
      })).subscribe(user => {
        this.profileInfo = user;
        this.level = user.level;

        this.store.dispatch(ProfileActions.updateProfile({ name: user.name, imgUrl: user.imgUrl }));
        // Challenge
        this.store.dispatch(ChallengeActions.setLevel({ level: user.level }));
      });




    this.store.select('profile').subscribe(state => {
      this.profileInfo.isProfileChangeModalOpen = state.profile.isProfileChangeModalOpen;
      this.profileInfo.name = state.profile.name;
      this.profileInfo.imgUrl = state.profile.imgUrl;
    });

    this.store.select('challenge').subscribe(state => {
      this.level = state.challenge.level;
    });

    /* this.level$ = this.store.select('challenge').pipe(
      map(data => data.challenge.level)
    ); */
  }

  handleChangeUser() {
    this.store.dispatch(ProfileActions.openProfileModal({ isModalOpen: true }));
  }

}
