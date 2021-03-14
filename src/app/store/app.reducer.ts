import { ActionReducerMap } from '@ngrx/store';
import * as fromProfile from './profile/profile.reducer';

export interface AppState {
  profile: fromProfile.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  profile: fromProfile.profileReducer
};
