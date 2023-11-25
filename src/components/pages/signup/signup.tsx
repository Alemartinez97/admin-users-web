import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Paper, Grid, TextField, Button, Avatar, Typography } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";

import api from "../../utils/api";

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
const userInfo: IUser = {
  surname: "",
  email: "",
  role: "",
  name: "",
  dni: "",
  age: "",
  phone: "",
  password: ""
}
const Signup = (props: { history: any; }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState(userInfo);
  const { history } = props;
  const { name, surname, dni, age, phone, password, email } = data;
  const handleSubmit = () => {
    return api
      .post("/signup", data)
      .then((result) => {
        enqueueSnackbar("Usuario " + email + " registrado con exito ", {
          variant: "success",
        });
        history.push("/login");
      })
      .catch((err) => {
        enqueueSnackbar("El usuario " + email + " no se registro " + err, {
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
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              autoFocus
              label="Name"
              name="name"
              margin="normal"
              value={name}
              onChange={(e) =>
                setData({ ...data, name: e.target.value })
              }
              fullWidth
            />
            <TextField
              variant="outlined"
              autoFocus
              label="Apellido"
              name="surname"
              margin="normal"
              value={surname}
              onChange={(e) =>
                setData({ ...data, surname: e.target.value })
              }
              fullWidth
            />
            <TextField
              variant="outlined"
              autoFocus
              label="Edad"
              name="age"
              margin="normal"
              value={age}
              onChange={(e) =>
                setData({ ...data, age: e.target.value })
              }
              fullWidth
            />
            <TextField
              variant="outlined"
              autoFocus
              label="Celular"
              name="phone"
              margin="normal"
              value={phone}
              onChange={(e) =>
                setData({ ...data, phone: e.target.value })
              }
              fullWidth
            />
            <TextField
              variant="outlined"
              autoFocus
              label="Nro de documento"
              name="dni"
              margin="normal"
              value={dni}
              onChange={(e) =>
                setData({ ...data, dni: e.target.value })
              }
              fullWidth
            />
            <TextField
              variant="outlined"
              autoFocus
              label="Email"
              type="email"
              name="email"
              margin="normal"
              value={email}
              onChange={(e) =>
                setData({ ...data, email: e.target.value })
              }
              fullWidth
            />
            <TextField
              label="Contraseña"
              name="password"
              type="password"
              margin="normal"
              value={password}
              onChange={(e) =>
                setData({ ...data, password: e.target.value })
              }
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
              Crear una cuenta
            </Button>
            <Button
              className={classes.submit}
              color="primary"
              variant="contained"
              onClick={() => history.push("/login")}
              fullWidth
            >
              Iniciar sesiôn
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};
export default withRouter(Signup);
