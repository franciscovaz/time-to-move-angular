import { createAction, props } from "@ngrx/store";


export const openProfileModal = createAction(
  '[Profile] Open Update Profile Modal',
  props<{
    isModalOpen: boolean;
  }>()
)


export const updateProfile = createAction(
  '[Profile] Update Profile',
  props<{
    name: string;
    imgUrl: string;
  }>()
);

//Create actions to level, currentExperience, experience to nextLevel, next level experience
