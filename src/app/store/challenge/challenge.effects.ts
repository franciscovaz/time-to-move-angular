import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import * as fromAppRoot from '../app.reducer';
import * as ChallengeActions from '../challenge/challenge.actions';

@Injectable()
export class ChallengeEffects {
  /* storeChallenge = createEffect(() =>
    this.actions$.pipe(
      ofType(ChallengeActions.storeChallenge),
      withLatestFrom(this.store.select('challenge')),
      switchMap(([actionData, challengeState]) => {


      }),
      map(challenge => {
        console.log('challenge: ', challenge);
        return true;
      })
    ), { dispatch: false }
  ) */
  completeChallenge = createEffect(() =>
    this.actions$.pipe(
      ofType(ChallengeActions.isChallengeSucceeded),
      withLatestFrom(this.store.select('challenge')),
      tap(([action, store]) => {
        console.log('action Effect: ', action);
        console.log('store Effect: ', store);

        return store;
      })
    ), { dispatch: false })

  constructor(
    private actions$: Actions,
    private store: Store<fromAppRoot.AppState>
  ) { }
}
