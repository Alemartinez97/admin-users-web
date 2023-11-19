import "./App.css";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import Menu from "./components/pages/menu/menu";
import instance from "./components/utils/api";
import { addUser } from "./components/actions/index";
import Login from "./components/pages/login/login";
import Signup from "./components/pages/signup/signup";
import store from "./components/store/index";
import routes from "./components/routes";
import SearchAppBar from "./components/forms/SearchAppBar";
import tableUser from "./components/pages/users/tableUser";

const App = connect(
  null,
  mapDispatchToProps
)((props) => {
  useEffect(() => {
    instance.get(`/users`).then((result) => {
      props.addUser(result.data);
    });
  });
  return (
    <BrowserRouter>
      <Menu></Menu>
      <Switch>
        <Route exact path={routes.signup} component={Signup} />
        <Route exact path={routes.login} component={Login} />
        <Route exact path={routes.tableUser} component={tableUser} />
      </Switch>
    </BrowserRouter>
  );
});
function mapDispatchToProps(dispatch) {
  return {
    addUser: (user) => dispatch(addUser(user)),
  };
}
const ConnectedApp = (props) => {
  return (
    <Provider store={store}>
      <SnackbarProvider>
        <SearchAppBar />
        <App />
      </SnackbarProvider>
    </Provider>
  );
};
export default ConnectedApp;
