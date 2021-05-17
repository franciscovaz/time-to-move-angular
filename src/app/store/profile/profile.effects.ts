import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { tap, withLatestFrom } from 'rxjs/operators';

import * as fromAppRoot from '../app.reducer';
import * as ProfileActions from '../profile/profile.actions';
import * as CountdownActions from '../countdown/countdown.actions';

@Injectable()
export class ProfileEffects {
  getProfileInfo = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.updateProfile),
      withLatestFrom(this.store.select('profile')),
      tap(([action, store]) => {

        const { imgUrl, name } = action;

        this.http.patch(`https://time-tomove-v2-default-rtdb.firebaseio.com/users/${localStorage.getItem('user_id')}.json`, { imgUrl: imgUrl, name: name }).subscribe(resp => {
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
