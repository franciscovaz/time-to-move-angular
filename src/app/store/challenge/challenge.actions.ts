import { createAction, props } from "@ngrx/store";

export const isChallengeSucceeded = createAction(
  '[Challenge] Is challenge succeeded',
  props<{
    challengeResponse: boolean,
    amount: number
  }>()
)

export const setExperienceLevel = createAction(
  '[Challenge] Set new experience level',
  props<{
    amount: boolean,
  }>()
)


export const storeChallenge = createAction(
  '[Challenge] Store Challenge'
)
