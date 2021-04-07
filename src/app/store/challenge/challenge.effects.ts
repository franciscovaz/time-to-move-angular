import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { CookieService } from "ngx-cookie-service";
import { tap, withLatestFrom } from 'rxjs/operators';

import * as fromAppRoot from '../app.reducer';
import * as ChallengeActions from '../challenge/challenge.actions';
import * as CountdownActions from '../countdown/countdown.actions';

@Injectable()
export class ChallengeEffects {
  completeChallenge = createEffect(() =>
    this.actions$.pipe(
      ofType(ChallengeActions.isChallengeSucceeded),
      withLatestFrom(this.store.select('challenge')),
      tap(([action, store]) => {
        this.store.dispatch(CountdownActions.countdownHasFinished({ hasFinished: false }))

        // se action.isChallengSuccess dispara uma action para atualizar a store...
        const { amount } = action;
        const { experienceToNextLevel, currentExperience, level, challengesCompleted } = store.challenge;

        let finalExperience = currentExperience + amount;

        if (finalExperience >= experienceToNextLevel) {
          finalExperience = finalExperience - experienceToNextLevel;
          this.store.dispatch(ChallengeActions.levelUp());
          this.store.dispatch(ChallengeActions.isLevelUpModalOpen({ isLevelUpModalOpen: true }))
        }
        this.store.dispatch(ChallengeActions.setCurrentExperience({ currentExperience: finalExperience }))



        this.cookieService.set('level', String(level));
        this.cookieService.set('currentExperience', String(currentExperience));
        this.cookieService.set('challengesCompleted', String(challengesCompleted));

        return store;
      })
    ), { dispatch: false })

  constructor(
    private actions$: Actions,
    private store: Store<fromAppRoot.AppState>,
    private cookieService: CookieService
  ) { }
}
