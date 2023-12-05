import React, { FunctionComponent, useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Paper, Grid, TextField, Button, Avatar, Typography } from "@material-ui/core";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { useSnackbar } from "notistack";

import { post } from "../../utils/api";
import { isValid } from "../../utils/isValid";
import { AGE, DNI, EMAIL, NAME, PASSWORD, PHONE } from "../../constant/constant";
import { useStyles } from "./style";

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
const Signup: React.FunctionComponent<RouteComponentProps> = ({ history }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState(userInfo);
  const { name, surname, dni, age, phone, password, email } = data;
  const functionOfEmail = isValid(email, EMAIL);
  const functionOfPhone = isValid(phone.toString(), PHONE);
  const functionOfAge = isValid(age.toString(), AGE);
  const functionOfDni = isValid(dni.toString(), DNI);
  const functionOfName = isValid(name, NAME);
  const functionOfSurname = isValid(surname, NAME);
  const functionOfPassword = password?.length === 60 ? true : isValid(password ? password?.toString() : "", PASSWORD);
  const isDisable = functionOfEmail && functionOfPhone && functionOfAge && functionOfName && functionOfSurname && functionOfAge && functionOfDni && functionOfPassword;
  const handleSubmit = () => {
    return post("/signup", data)
      .then((result: any) => {
        enqueueSnackbar("Usuario " + email + " registrado con exito ", {
          variant: "success",
        });
        history.push("/login");
      })
      .catch((err: Error) => {
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
              name="name"
              margin="normal"
              value={name}
              onChange={(e) =>
                setData({ ...data, name: e.target.value })
              }
              label={!functionOfName ? "Nombre Invalido" : "Nombre"}
              error={!functionOfName}
              fullWidth
            />
            <TextField
              variant="outlined"
              autoFocus
              name="surname"
              margin="normal"
              value={surname}
              label={!functionOfSurname ? "Apellido Invalido" : "Apellido"}
              error={!functionOfSurname}
              onChange={(e) =>
                setData({ ...data, surname: e.target.value })
              }
              fullWidth
            />
            <TextField
              variant="outlined"
              autoFocus
              name="age"
              margin="normal"
              value={age}
              onChange={(e) =>
                setData({ ...data, age: e.target.value })
              }
              label={!functionOfAge ? "Edad Invalida" : "Edad"}
              error={!functionOfAge}
              fullWidth
            />
            <TextField
              variant="outlined"
              autoFocus
              name="phone"
              margin="normal"
              value={phone}
              onChange={(e) =>
                setData({ ...data, phone: e.target.value })
              }
              label={!functionOfPhone ? "Celular Invalido" : "Celular"}
              error={!functionOfPhone}
              fullWidth
            />
            <TextField
              variant="outlined"
              autoFocus
              name="dni"
              margin="normal"
              value={dni}
              onChange={(e) =>
                setData({ ...data, dni: e.target.value })
              }
              label={!functionOfDni ? "Dni invalido" : "Nro de documento"}
              error={!functionOfDni}
              fullWidth
            />
            <TextField
              variant="outlined"
              autoFocus
              type="email"
              name="email"
              margin="normal"
              value={email}
              onChange={(e) =>
                setData({ ...data, email: e.target.value })
              }
              label={!functionOfEmail ? "Correo Invalido" : "Email"}
              error={!functionOfEmail}
              fullWidth
            />
            <TextField
              name="password"
              type="password"
              margin="normal"
              value={password}
              onChange={(e) =>
                setData({ ...data, password: e.target.value })
              }
              label={!functionOfPassword ? "Contraseña invalida, debe tener minimo 8 caracteres con numeros y letras" : "Contraseña"}
              error={!functionOfPassword}
              variant="outlined"
              fullWidth
            />
            <Button
              data-testid="signup-button"
              className={classes.submit}
              variant="contained"
              color="primary"
              onClick={() => handleSubmit()}
              fullWidth
              disabled={!isDisable}
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
