import React from "react";
import {
    TextField,
    Grid,
    Button,
    InputLabel,
    MenuItem,
    Typography,
    FormControl,
    Select,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import { isValid } from "../utils/isValid";
import { AGE, DNI, EMAIL, NAME, PHONE } from "../constant/constant";

const useStyles = makeStyles((theme) => ({
    dialog: {
        padding: 0,
        margin: "0px auto",
        background: "blue",
    },
    paper: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    form: {
        width: 500,
        margin: theme.spacing(6, 6, 3),
    },
}));

export default function FormUser({ setUserData, userData, handleClose, submitting, open, handleSubmit }: IUserFormProps) {
    const {password, name, surname,age,dni, email, role, phone } = userData;
    const functionOfEmail = isValid(email, EMAIL);
    const functionOfPhone = isValid(phone.toString(), PHONE);
    const functionOfAge = isValid(age.toString(), AGE);
    const functionOfDni = isValid(dni.toString(), DNI);
    const functionOfName = isValid(name, NAME);
    const functionOfSurname = isValid(surname, NAME);

    const classes = useStyles();
    const body = (
        <form
            noValidate
            autoComplete="off"
            className={classes.form}
        >
            <Typography variant="h5" gutterBottom>
                Datos del usuario
            </Typography>
            <Grid container>
                <Grid item xs={12}>
                    <TextField
                        id="name"
                        onChange={(e) =>
                            setUserData({ ...userData, name: e.target.value })
                        }
                        value={name}
                        label={!functionOfName ? "Nombre Invalido" : "Nombre"}
                        error={!functionOfName}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="surname"
                        onChange={(e) =>
                            setUserData({ ...userData, surname: e.target.value })
                        }
                        value={surname}
                        label={!functionOfSurname ? "Apellido Invalido" : "Apellido"}
                        error={!functionOfSurname}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        type="number"
                        id="age"
                        onChange={(e) =>
                            setUserData({ ...userData, age: e.target.value })
                        }
                        value={age}
                        label={!functionOfAge ? "Edad Invalida" : "Edad"}
                        error={!functionOfAge}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        type="number"
                        id="phone"
                        onChange={(e) =>
                            setUserData({ ...userData, phone: e.target.value })
                        }
                        value={phone}
                        label={!functionOfPhone ? "Celular Invalido" : "Celular"}
                        error={!functionOfPhone}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="dni"
                        type="number"
                        InputProps={{ inputProps: { min: 8, max: 8 } }}
                        onChange={(e) =>
                            setUserData({ ...userData, dni: e.target.value })
                        }
                        value={dni}
                        label={!functionOfDni ? "Dni invalido" : "Nro de documento"}
                        error={!functionOfDni}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="standard"
                        id="email"
                        type="email"
                        onChange={(e) =>
                            setUserData({ ...userData, email: e.target.value })
                        }
                        value={email}
                        label={!functionOfEmail ? "Correo Invalido" : "Email"}
                        error={!functionOfEmail}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="password"
                        type="password"
                        onChange={(e) =>
                            setUserData({ ...userData, password: e.target.value })
                        }
                        value={password}
                        label={"Clave"}
                        fullWidth
                    />
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <FormControl fullWidth>
                    {!role && <InputLabel id="demo-simple-select-label">Rol</InputLabel>}
                    <Select
                        labelId="demo-simple-select-label"
                        id="role"
                        value={role}
                        onChange={(e) => setUserData({ ...userData, role: e.target.value })}
                    >
                        <MenuItem value={"Admin"}>Admin</MenuItem>
                        <MenuItem value={"User"}>User</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid>
                <Button
                    color="primary"
                    disabled={!functionOfEmail}
                    variant="contained"
                    style={{ marginRight: 10 }}
                    onClick={handleSubmit}
                >
                    Guardar
                </Button>

                <Button
                    color="primary"
                    type="button"
                    onClick={handleClose}
                >
                    Cancelar
                </Button>
            </Grid>
        </form>
    );
    const modalSelect = (
        <div>
            <Dialog
                open={open}
                BackdropProps={{
                    timeout: 500,
                }}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div>{body}</div>
            </Dialog>
        </div>
    );
    return modalSelect;
}