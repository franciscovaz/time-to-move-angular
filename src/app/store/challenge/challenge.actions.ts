import { createAction, props } from "@ngrx/store";

export const isChallengeSucceeded = createAction(
  '[Challenge] Is challenge succeeded',
  props<{
    challengeResponse: boolean,
  }>()
)

export const storeChallenge = createAction(
  '[Challenge] Store Challenge'
)
