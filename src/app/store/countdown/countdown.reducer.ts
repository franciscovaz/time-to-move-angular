import { createReducer, on, Action } from "@ngrx/store";
import { Countdown } from "./countdown.module";

import * as CountdownActions from './countdown.actions';

export interface State {
  countdown: Countdown;
}

const initialState: State = {
  countdown: {
    countdownTime: 0.1 * 60,
    isModalOpen: false,
    hasFinished: false,
    isActive: false
  }
}

const _countdownReducer = createReducer(
  initialState,

  on(
    CountdownActions.openCountdownModal,
    (state, action) => ({
      ...state,
      countdown: {
        ...state.countdown,
        isModalOpen: action.isModalOpen
      }
    })
  ),

  on(
    CountdownActions.updateCountdownTime,
    (state, action) => ({
      ...state,
      countdown: {
        ...state.countdown,
        countdownTime: action.countdownTime * 60
      }
    })
  ),

  on(
    CountdownActions.countdownHasFinished,
    (state, action) => ({
      ...state,
      countdown: {
        ...state.countdown,
        hasFinished: action.hasFinished
      }
    })
  ),

  on(
    CountdownActions.countdownIsActive,
    (state, action) => ({
      ...state,
      countdown: {
        ...state.countdown,
        isActive: action.isActive
      }
    })
  )
)


export function countdownReducer(state: State, action: Action) {
  return _countdownReducer(state, action);
}
