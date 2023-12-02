import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Paper, Grid, TextField, Button, Avatar, Typography } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";

import { post } from "../../utils/api";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = (props: { history: any; }) => {
  const { history } = props;
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
