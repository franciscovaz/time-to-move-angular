import { createReducer, Action, on } from "@ngrx/store";

import * as ProfileActions from './profile.actions';

export interface State {
  profile: {
    name: string;
    imgUrl: string;
  }
}

const initialState: State = {
  profile: {
    name: '',
    imgUrl: ''
  }
}

const _profileReducer = createReducer(
  initialState,

  on(
    ProfileActions.updateProfile,
    (state, action) => ({
      ...state,
      profile: {
        name: action.name,
        imgUrl: action.imgUrl
      }
    })
  )
);

export function profileReducer(state: State, action: Action) {
  return _profileReducer(state, action);
}
