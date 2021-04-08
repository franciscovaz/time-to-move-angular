import { createReducer, Action, on } from "@ngrx/store";

import * as ProfileActions from './profile.actions';
import { Profile } from './profile.module';

export interface State {
  profile: Profile;
}

const initialState: State = {
  profile: {
    name: 'John Doe',
    imgUrl: 'https://icon2.cleanpng.com/20180405/rge/kisspng-login-google-account-computer-icons-user-activity-5ac6bbe6ad7041.1621164815229736707104.jpg',
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
