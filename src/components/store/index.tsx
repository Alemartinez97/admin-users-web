import { createStore, combineReducers } from "redux";

import user from "../reducers/user";
interface ExtendedWindow extends Window {
  __REDUX_DEVTOOLS_EXTENSION__?: any;
}
const reducers = combineReducers({ user });

const store = createStore(
  reducers,
  (window as ExtendedWindow).__REDUX_DEVTOOLS_EXTENSION__ && (window as ExtendedWindow).__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
