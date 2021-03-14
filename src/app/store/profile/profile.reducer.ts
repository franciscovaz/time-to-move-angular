import { createReducer, Action, on } from "@ngrx/store";

import * as ProfileActions from './profile.actions';
import { Profile } from './profile.module';

export interface State {
  profile: Profile;
}

const initialState: State = {
  profile: {
    name: '',
    imgUrl: '',
    isProfileChangeModalOpen: false
  }
}

const _profileReducer = createReducer(
  initialState,

  on(
    ProfileActions.openProfileModal,
    (state, action) => ({
      ...state,
      profile: {
        ...state.profile,
        isProfileChangeModalOpen: action.isModalOpen
      }
    })
  ),

  on(
    ProfileActions.updateProfile,
    (state, action) => ({
      ...state,
      profile: {
        name: action.name,
        imgUrl: action.imgUrl,
        isProfileChangeModalOpen: false
      }
    })
  )
);

export function profileReducer(state: State, action: Action) {
  return _profileReducer(state, action);
}
