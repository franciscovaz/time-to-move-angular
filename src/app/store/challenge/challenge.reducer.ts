import { createReducer, on, Action } from "@ngrx/store";

import * as ChallengeActions from './challenge.actions';

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

export interface State {
  challenge: {
    isChallengeSucceeded: boolean;
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    activeChallenge: Challenge;
  }
}

const initialState: State = {
  challenge: {
    isChallengeSucceeded: false,
    activeChallenge: null,
    challengesCompleted: 0,
    currentExperience: 0,
    level: 1
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
