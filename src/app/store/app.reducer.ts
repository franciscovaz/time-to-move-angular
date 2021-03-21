import { ActionReducerMap } from '@ngrx/store';
import * as fromProfile from './profile/profile.reducer';
import * as fromCountdown from './countdown/countdown.reducer';
import * as fromChallenge from './challenge/challenge.reducer';

export interface AppState {
  profile: fromProfile.State;
  countdown: fromCountdown.State;
  challenge: fromChallenge.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  profile: fromProfile.profileReducer,
  countdown: fromCountdown.countdownReducer,
  challenge: fromChallenge.challengeReducer
};
