import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import * as ChallengeActions from '../../store/challenge/challenge.actions';

import * as frommAppRoot from '../../store/app.reducer';

@Component({
  selector: 'app-completed-challenges',
  templateUrl: './completed-challenges.component.html',
  styleUrls: ['./completed-challenges.component.scss']
})
export class CompletedChallengesComponent implements OnInit {

  // completedChallenges$: Observable<number>;
  completedChallenges: number;

  constructor(
    private readonly store: Store<frommAppRoot.AppState>,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    /* this.completedChallenges$ = this.store.select('challenge').pipe(
      map((challenge) => {
        return challenge.challenge.challengesCompleted
      })
    ); */

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
        this.store.dispatch(ChallengeActions.setCompletedChallenges({ completedChallenges: user.challengesCompleted }))
        this.completedChallenges = user.challengesCompleted;
      });


    this.store.select('challenge').subscribe(data => {
      this.completedChallenges = data.challenge.challengesCompleted;
    })
  }




}
