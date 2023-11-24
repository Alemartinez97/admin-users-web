import {
  SET_USER,
  DELETE_USER,
  EDIT_USER,
  ADD_USER,
} from "../constant/actions-types";

export const setUser = (payload: IUser) => {
  return { type: SET_USER, payload };
};
export const deleteUser = (payload: IUser) => {
  return { type: DELETE_USER, payload };
};
export const editUser = (payload: IUser) => {
  return { type: EDIT_USER, payload };
};
export const addUser = (payload: IUser) => {
  return { type: ADD_USER, payload };
};
