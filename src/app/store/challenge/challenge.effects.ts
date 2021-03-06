import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { tap, withLatestFrom } from 'rxjs/operators';

import * as fromAppRoot from '../app.reducer';
import * as ChallengeActions from '../challenge/challenge.actions';
import * as CountdownActions from '../countdown/countdown.actions';

@Injectable()
export class ChallengeEffects {
  completeChallenge = createEffect(() =>
    this.actions$.pipe(
      ofType(ChallengeActions.isChallengeSucceeded),
      withLatestFrom(this.store.select('challenge'), this.store.select('countdown')),
      tap(([action, challengeStore, countdownStore]) => {
        this.store.dispatch(CountdownActions.countdownHasFinished({ hasFinished: false }));
        if (action.challengeResponse === true && action.amount !== 0) {

          const { amount } = action;
          const { experienceToNextLevel, currentExperience, level, challengesCompleted } = challengeStore.challenge;
          const { countdownTime, sumCountdownTime } = countdownStore.countdown;

          let finalExperience = currentExperience + amount;
          let totalCountdownTime = countdownTime + sumCountdownTime;

          if (finalExperience >= experienceToNextLevel) {

            finalExperience = finalExperience - experienceToNextLevel;
            this.store.dispatch(ChallengeActions.levelUp());
            this.store.dispatch(ChallengeActions.isLevelUpModalOpen({ isLevelUpModalOpen: true }));


            this.http.patch(`https://time-tomove-v2-default-rtdb.firebaseio.com/users/${localStorage.getItem('user_id')}.json`, { level: level + 1, experienceToNextLevel: Math.pow((level + 2) * 4, 2) }).subscribe(resp => {

            });
          }
          this.store.dispatch(CountdownActions.updateSumCountdownTime({ actualCountdownTime: totalCountdownTime }));
          this.store.dispatch(ChallengeActions.setCurrentExperience({ currentExperience: finalExperience }));

          this.http.patch(`https://time-tomove-v2-default-rtdb.firebaseio.com/users/${localStorage.getItem('user_id')}.json`, { currentExperience: finalExperience, challengesCompleted: challengesCompleted, sumCountdownTime: totalCountdownTime }).subscribe(resp => {
          });

          return challengeStore;
        }

      })
    ), { dispatch: false });

  updateCurrentExperience = createEffect(() =>
    this.actions$.pipe(
      ofType(ChallengeActions.setCurrentExperience),
      withLatestFrom(this.store.select('challenge')),
      tap(([action, store]) => {

        const { currentExperience } = action;

        this.http.patch(`https://time-tomove-v2-default-rtdb.firebaseio.com/users/${localStorage.getItem('user_id')}.json`, { currentExperience }).subscribe(resp => {
        });

        return store;
      })
    ), { dispatch: false });

  constructor(
    private actions$: Actions,
    private store: Store<fromAppRoot.AppState>,
    private http: HttpClient
  ) { }
}
