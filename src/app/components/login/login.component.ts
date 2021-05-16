import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import * as fromAppRoot from '../../store/app.reducer';
import * as ProfileActions from '../../store/profile/profile.actions';
import * as ChallengeActions from '../../store/challenge/challenge.actions';
import * as CountdownActions from '../../store/countdown/countdown.actions';

interface User {
  id: string;
  email: '';
  name: string;
  imgUrl: string;
  challengesCompleted: number;
  currentExperience: number;
  level: number;
  experienceToNextLevel: number;
  sumCountdownTime: number;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: User;
  usersFromApi: User[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<fromAppRoot.AppState>,
  ) { }

  ngOnInit(): void {
    this.user = {
      id: '',
      email: '',
      name: '',
      imgUrl: '',
      challengesCompleted: 0,
      currentExperience: 0,
      level: 0,
      experienceToNextLevel: 0,
      sumCountdownTime: 0,
    }

    this.fetchUsers();

    if (localStorage.getItem('email')) {

      this.router.navigate(['/time']);
    }
  }

  handleSubmit(): void {
    localStorage.setItem('email', this.user.email);

    if (this.usersFromApi.filter(user => user.email === this.user.email).length > 0) {
      // ja existe este email, vamos redirecionar e atualizar a store com a info do user
      console.log('user existe!');
      for (var i = 0; i < this.usersFromApi.length; i++) {
        if (this.usersFromApi[i].email === this.user.email) {

          localStorage.setItem('user_id', this.usersFromApi[i].id);
          // Profile
          this.store.dispatch(ProfileActions.updateProfile({ name: this.usersFromApi[i].name, imgUrl: this.usersFromApi[i].imgUrl }));
          // Challenge
          this.store.dispatch(ChallengeActions.setLevel({ level: this.usersFromApi[i].level }));
          this.store.dispatch(ChallengeActions.setCurrentExperience({ currentExperience: this.usersFromApi[i].currentExperience }));

          this.store.dispatch(ChallengeActions.setCompletedChallenges({ completedChallenges: this.usersFromApi[i].challengesCompleted }));
          this.store.dispatch(ChallengeActions.setExperienceToNextLevel({ experienceToNextLevel: this.usersFromApi[i].experienceToNextLevel }));

          this.store.dispatch(CountdownActions.updateSumCountdownTime({ actualCountdownTime: this.usersFromApi[i].sumCountdownTime }));
        }
      }

      this.router.navigate(['/time']);
    } else {
      console.log('user nao existe!');

      // user nao existe, vamos criar
      this.http.post('https://time-tomove-v2-default-rtdb.firebaseio.com/users.json', { ...this.user, email: this.user.email, name: 'John Doe', experienceToNextLevel: 64 }).subscribe((resp: { name: string }) => {
        localStorage.setItem('user_id', resp.name);
        // Profile
        this.store.dispatch(ProfileActions.updateProfile({ name: 'John Doe', imgUrl: 'http://achieveplusdrivingschool.com.au/wp-content/themes/customizeTheme/img/reviewlogo.png' }));
        // Challenge
        this.store.dispatch(ChallengeActions.setLevel({ level: 1 }));
        this.store.dispatch(ChallengeActions.setCurrentExperience({ currentExperience: 0 }));
        this.store.dispatch(ChallengeActions.setCompletedChallenges({ completedChallenges: 0 }));
        this.store.dispatch(ChallengeActions.setExperienceToNextLevel({ experienceToNextLevel: 64 }));
        this.store.dispatch(CountdownActions.updateSumCountdownTime({ actualCountdownTime: 0 }));

        this.router.navigate(['/time']);
      })
    }

  }


  private fetchUsers(): void {
    this.http.get('https://time-tomove-v2-default-rtdb.firebaseio.com/users.json').pipe(
      map(respData => {
        const usersArray = [];
        for (const key in respData) {
          if (respData.hasOwnProperty(key)) {
            usersArray.push({ ...respData[key], id: key })
          }
        }
        return usersArray;
      })).subscribe(users => {
        this.usersFromApi = users;
      })
  }

}
