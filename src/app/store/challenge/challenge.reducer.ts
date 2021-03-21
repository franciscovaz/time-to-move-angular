import { createReducer, on, Action } from "@ngrx/store";

import * as ChallengeActions from './challenge.actions';

export interface State {
  challenge: {
    isChallengeSucceeded: boolean
  }
}

const initialState: State = {
  challenge: {
    isChallengeSucceeded: false
  }
}

const _challengeReducer = createReducer(
  initialState,

  on(
    ChallengeActions.isChallengeSucceeded,
    (state, action) => ({
      ...state,
      challenge: {
        ...state.challenge,
        isChallengeSucceeded: action.challengeResponse
      }
    })
  ),


)


export function challengeReducer(state: State, action: Action) {
  return _challengeReducer(state, action);
}
