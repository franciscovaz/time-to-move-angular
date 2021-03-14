import { createAction, props } from "@ngrx/store";

export const getProfile = createAction(
  '[Profile] Get Profile Info'
)

export const updateProfile = createAction(
  '[Profile] Update Profile',
  props<{
    name: string;
    imgUrl: string;
  }>()
);
