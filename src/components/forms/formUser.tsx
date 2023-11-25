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
                        value={userData.name}
                        label="Nombre"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="surname"
                        onChange={(e) =>
                            setUserData({ ...userData, surname: e.target.value })
                        }
                        value={userData.surname}
                        label="Apellido"
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
                        value={userData.age}
                        label="Edad"
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
                        value={userData.phone}
                        label="Celular"
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
                        value={userData.dni}
                        label="Nro de Documento"
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
                        value={userData.email}
                        label={"Error"}
                        fullWidth
                        error
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="password"
                        type="password"
                        onChange={(e) =>
                            setUserData({ ...userData, password: e.target.value })
                        }
                        value={userData.password}
                        label={"Clave"}
                        fullWidth
                    />
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <FormControl fullWidth>
                    {!userData.role && <InputLabel id="demo-simple-select-label">Rol</InputLabel>}
                    <Select
                        labelId="demo-simple-select-label"
                        id="role"
                        value={userData.role}
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
                    disabled={submitting}
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