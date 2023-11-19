import {
    SET_USER,
    DELETE_USER,
    EDIT_USER,
    ADD_USER,
  } from "../constant/actions-types";
  
  const user = (state = [], action) => {
    const { type, payload } = action;
    switch (type) {
      case SET_USER:
        return [...state, payload];
      case ADD_USER:
        return payload;
      case DELETE_USER:
        return state.filter((user) => user.dni !== payload.dni);
      case EDIT_USER:
        return state.map((user) => {
          if (payload.dni === user.dni) {
            return payload;
          }
          return user;
        });
      default:
        return state;
    }
  };
  export default user;