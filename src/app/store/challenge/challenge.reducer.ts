import { createReducer, on, Action } from "@ngrx/store";

import * as ChallengeActions from './challenge.actions';
import { Challenge } from "./challenge.module";

export interface State {
  challenge: {
    isChallengeSucceeded: boolean;
    level: number;
    currentExperience: number;
    experienceToNextLevel: number;
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
    experienceToNextLevel: Math.pow((1 + 1) * 4, 2),
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
        isChallengeSucceeded: action.challengeResponse,
        experienceToNextLevel: Math.pow((state.challenge.level + 1) * 4, 2),
        currentExperience: action.amount !== 0 ? action.amount + state.challenge.currentExperience : state.challenge.currentExperience,
      }
    })
  ),
  on(ChallengeActions.storeActiveChallenge,
    (state, action) => ({
      ...state,
      challenge: {
        ...state.challenge,
        activeChallenge: action.activeChallenge
      }
    }))


)


export function challengeReducer(state: State, action: Action) {
  return _challengeReducer(state, action);
}
