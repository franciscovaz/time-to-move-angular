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
export const setLevel = createAction(
  '[Challenge] Set level',
  props<{
    level: number,
  }>()
)
export const setCompletedChallenges = createAction(
  '[Challenge] Set completed challenges',
  props<{
    completedChallenges: number,
  }>()
)
export const setExperienceToNextLevel = createAction(
  '[Challenge] Set experience to next level',
  props<{
    experienceToNextLevel: number,
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

export const isLevelUpModalOpen = createAction(
  '[Countdown] Is level up modal open',
  props<{
    isLevelUpModalOpen: boolean
  }>()
);
