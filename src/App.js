import "./App.css";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import Menu from "./components/pages/menu/menu";
import { get } from "./components/utils/api";
import { addUser } from "./components/actions/index";
import Login from "./components/pages/login/login";
import Signup from "./components/pages/signup/signup";
import store from "./components/store/index";
import routes from "./components/routes/routes";
import tableUser from "./components/pages/users/tableUser";
import NotFound from "./components/pages/notFound/notFound";
import { useProtectedRoute } from "./components/hooks/useProtectedRoute";

const App = connect(
  null,
  mapDispatchToProps
)((props) => {
  const protectedRoute = useProtectedRoute();
  useEffect(() => {
    get(`/users`).then((result) => {
      props.addUser(result.data);
    }).catch(err => console.error(err));
  }, []);
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={routes.signup} component={Signup} />
        <Route exact path={routes.login} component={Login} />
        {
          protectedRoute && <Route>
            <Menu />
            <Route exact path={routes.tableUser} component={tableUser} />
          </Route>
        }
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
});
function mapDispatchToProps(dispatch) {
  return {
    addUser: (user) => dispatch(addUser(user)),
  };
}
const ConnectedApp = () => {
  return (
    <Provider store={store}>
      <SnackbarProvider>
        <App />
      </SnackbarProvider>
    </Provider>
  );
};
export default ConnectedApp;
