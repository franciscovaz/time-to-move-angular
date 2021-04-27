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
    isLevelUpModalOpen: boolean
  }
}

const initialState: State = {
  challenge: {
    isChallengeSucceeded: false,
    activeChallenge: null,
    challengesCompleted: 0,
    currentExperience: 0,
    experienceToNextLevel: Math.pow((1 + 1) * 4, 2),
    level: 1,
    isLevelUpModalOpen: false
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
        activeChallenge: null,
        challengesCompleted: action.amount === 0 ? state.challenge.challengesCompleted : state.challenge.challengesCompleted + 1,
      }
    })
  ),
  on(
    ChallengeActions.storeActiveChallenge,
    (state, action) => ({
      ...state,
      challenge: {
        ...state.challenge,
        activeChallenge: action.activeChallenge
      }
    })
  ),
  on(
    ChallengeActions.setCurrentExperience,
    (state, action) => ({
      ...state,
      challenge: {
        ...state.challenge,
        currentExperience: action.currentExperience
      }
    })
  ),
  on(
    ChallengeActions.setLevel,
    (state, action) => ({
      ...state,
      challenge: {
        ...state.challenge,
        level: action.level
      }
    })
  ),
  on(
    ChallengeActions.setCompletedChallenges,
    (state, action) => ({
      ...state,
      challenge: {
        ...state.challenge,
        level: 1,
        challengesCompleted: action.completedChallenges
      }
    })
  ),
  on(
    ChallengeActions.setExperienceToNextLevel,
    (state, action) => ({
      ...state,
      challenge: {
        ...state.challenge,
        experienceToNextLevel: action.experienceToNextLevel,
      }
    })
  ),
  on(
    ChallengeActions.levelUp,
    (state, action) => ({
      ...state,
      challenge: {
        ...state.challenge,
        level: state.challenge.level + 1,
        experienceToNextLevel: Math.pow((state.challenge.level + 2) * 4, 2),
      }
    })
  ),
  on(ChallengeActions.isLevelUpModalOpen,
    (state, action) => ({
      ...state,
      challenge: {
        ...state.challenge,
        isLevelUpModalOpen: action.isLevelUpModalOpen
      }
    })
  )


)


export function challengeReducer(state: State, action: Action) {
  return _challengeReducer(state, action);
}
