import { createReducer, on, Action } from "@ngrx/store";
import { Countdown } from "./countdown.module";

import * as CountdownActions from './countdown.actions';

export interface State {
  countdown: Countdown;
}

const initialState: State = {
  countdown: {
    countdownTime: 25,
    isModalOpen: false
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
        countdownTime: action.countdownTime
      }
    })
  )
)


export function countdownReducer(state: State, action: Action) {
  return _countdownReducer(state, action);
}
