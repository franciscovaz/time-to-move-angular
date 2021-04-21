import { Component, OnInit } from '@angular/core';

import * as fromAppRoot from '../../store/app.reducer';
import * as CountdownActions from '../../store/countdown/countdown.actions';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';


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
  selector: 'app-after-login-to-fix',
  templateUrl: './after-login-to-fix.component.html',
  styleUrls: ['./after-login-to-fix.component.scss']
})
export class AfterLoginToFixComponent implements OnInit {

  user: User;

  constructor(
    private http: HttpClient,
    private store: Store<fromAppRoot.AppState>,
  ) { }



  ngOnInit(): void {
    localStorage.setItem('menuToShow', 'Ranking');

    // TODO mudar esta approach
    this.http.get('https://time-to-move-14d11-default-rtdb.firebaseio.com/users.json').pipe(
      map(respData => {
        const usersArray = [];
        for (const key in respData) {
          if (respData.hasOwnProperty(key)) {
            usersArray.push({ ...respData[key], id: key })
          }
        }
        return usersArray;
      })).subscribe(users => {
        // ja existe este email, vamos redirecionar e atualizar a store com a info do user
        for (var i = 0; i < users.length; i++) {

          if (users[i].email === localStorage.getItem('email')) {
            this.store.dispatch(CountdownActions.updateSumCountdownTime({ actualCountdownTime: users[i].sumCountdownTime }));
          }
        }
      });
  }
}
