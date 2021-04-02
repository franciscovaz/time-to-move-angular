import { createAction, props } from "@ngrx/store";
import { Challenge } from "./challenge.module";

export const isChallengeSucceeded = createAction(
  '[Challenge] Is challenge succeeded',
  props<{
    challengeResponse: boolean,
    amount: number
  }>()
)

export const setCurrentExperience = createAction(
  '[Challenge] Set current experience',
  props<{
    currentExperience: number,
  }>()
)

export const levelUp = createAction(
  '[Challenge] Level up',
)


export const storeActiveChallenge = createAction(
  '[Challenge] Store active challenge',
  props<{
    activeChallenge: Challenge,
  }>()
)
