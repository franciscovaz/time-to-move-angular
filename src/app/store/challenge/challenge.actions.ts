import { createAction, props } from "@ngrx/store";
import { Challenge } from "./challenge.module";

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


export const storeActiveChallenge = createAction(
  '[Challenge] Store active challenge',
  props<{
    activeChallenge: Challenge,
  }>()
)
