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
