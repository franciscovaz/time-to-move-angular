import { createAction, props } from "@ngrx/store";

export const openCountdownModal = createAction(
  '[Countdown] Open countdown modal',
  props<{
    isModalOpen: boolean
  }>()
);


export const updateCountdownTime = createAction(
  '[Countdown] Update countdown time',
  props<{
    countdownTime: number
  }>()
);

export const countdownHasFinished = createAction(
  '[Countdown] Countdown has finished',
  props<{
    hasFinished: boolean
  }>()
);

export const countdownIsActive = createAction(
  '[Countdown] Countdown is active',
  props<{
    isActive: boolean
  }>()
);
