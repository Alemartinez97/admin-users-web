import {
  SET_USER,
  DELETE_USER,
  EDIT_USER,
  ADD_USER,
} from "../constant/actions-types";

export const setUser = (payload) => {
  return { type: SET_USER, payload };
};
export const deleteUser = (payload) => {
  return { type: DELETE_USER, payload };
};
export const editUser = (payload) => {
  return { type: EDIT_USER, payload };
};
export const addUser = (payload) => {
  return { type: ADD_USER, payload };
};
