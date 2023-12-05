import React, { useState, FunctionComponent } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Paper, Grid, TextField, Button, Avatar, Typography } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { useSnackbar } from "notistack";

import { post } from "../../utils/api";
import { useStyles } from "./style";

const Login: FunctionComponent<RouteComponentProps> = ({ history }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = () => {
    const values = {
      email,
      password,
    };
    return post("/login", values)
      .then((result: any) => {
        if (result.data.token) {
          const token = result.data.token.replace(/[ '"]+/g, " ");
          localStorage.setItem("token", token);
        }
        enqueueSnackbar("Usuario " + email + " inicio  sesión con exito ", {
          variant: "success",
        });
        history.push("/");
      })
      .catch((err: Error) => {
        enqueueSnackbar("El usuario " + email + " no inicio   sesión  " + err, {
          variant: "error",
        });
        console.error("Mutation error:", err);
      });
  };
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              autoFocus
              label="Email"
              type="email"
              name="email"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
            <TextField
              label="Contraseña"
              name="password"
              type="password"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
              fullWidth
            />
            <Button
              className={classes.submit}
              variant="contained"
              color="primary"
              onClick={() => handleSubmit()}
              fullWidth
            >
              Iniciar sesiôn
            </Button>
            <Button
              className={classes.submit}
              color="primary"
              variant="contained"
              onClick={() => history.push("/signup")}
              fullWidth
            >
              Crea una cuenta
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};
export default withRouter(Login);
