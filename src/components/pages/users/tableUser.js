import React from "react";
import MaterialTable from "material-table";
import { connect } from "react-redux";
import api from "../../utils/api";
import {
  Container,
  TextField,
  Grid,
  Button,
  InputLabel,
  MenuItem,
  Typography,
  FormControl,
  Select,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { useSnackbar } from "notistack";
import Dialog from "@material-ui/core/Dialog";
import { makeStyles } from "@material-ui/core/styles";

import tableIcons from "../../forms/icons";
import { deleteUser, setUser, editUser } from "../../actions/index";
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
const userInfo =
{
  surname: "",
  email: "",
  role: "",
  name: "",
  dni: "",
  age: "",
  phone: "",
}
const TableUser = (props) => {
  const classes = useStyles();
  const { submitting, user } = props;
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [userData, setUserData] = React.useState(userInfo);
  const { name, email, role } = userData;
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = () => {
    delete userData.tableData;
    if (!userData) {
      enqueueSnackbar("Asegurese de llenar todos los campos", {
        variant: "warning",
      });
      return;
    }
    if (
      name &&
      email &&
      role
    ) {
      if (value) {
        handleClose();
        return api
          .put(`/users/${userData.dni}`, userData)
          .then((data) => {
            props.editUser(userData);
            enqueueSnackbar(
              "El usuario " + name + " fue actualizado con exito ",
              {
                variant: "success",
              }
            );
          })
          .catch((err) => {
            enqueueSnackbar("Error, El usuario no se actualizo. " + err.msg, {
              variant: "error",
            });
            console.error("Mutation error:", err);
          });
      } else {
        handleClose();
        return api
          .post("/users", userData)
          .then((data) => {
            props.setUser(userData);
            enqueueSnackbar(
              "EL usuario " + userData.name + " fue guardada con exito ",
              {
                variant: "success",
              }
            );
          })
          .catch((err) => {
            enqueueSnackbar("Error, EL usuario no  fue creado. " + err.msg, {
              variant: "error",
            });
            console.error("Mutation error:", err);
          });
      }
    } else {
      return enqueueSnackbar("Asegurese de llenar todos los campos", {
        variant: "warning",
      });
    }
  };
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
            id="email"
            type="email"
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
            value={userData.email}
            label={"Correo"}
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
            value={userData.password}
            label={"Clave"}
            fullWidth
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <FormControl className={classes.formControl} fullWidth>
          <InputLabel id="demo-simple-select-label">Rol</InputLabel>
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

  return (
    <Container>
      <>
        {modalSelect}
        <MaterialTable
          actions={[
            {
              icon: () => <span>{<tableIcons.Add />}</span>,
              onClick: () => {
                setUserData(userInfo);
                setOpen(true);
                setValue(false);
              },
              isFreeAction: true,
              tooltip: "Nuevo Usuario",
            },
            {
              icon: () => <span>{<tableIcons.Edit />}</span>,
              onClick: (event, rowData) => {
                setUserData(rowData);
                setOpen(true);
                setValue(true);
              },
              onRowUpdate: true,
              tooltip: "Editar Usuario",
            },
          ]}
          options={{
            search: true,
            paging: true,
            toolbarButtonAlignment: "left",
            actionsColumnIndex: 99,
            headerStyle: {
              fontFamily: "italic",
            },
          }}
          title="Nuevo Usuario"
          columns={[
            {
              title: "Nombre",
              field: "name",
            },
            {
              title: "Apellido",
              field: "surname",
            },
            {
              title: "Edad",
              field: "age",
            },
            {
              title: "Celular",
              field: "phone",
            },
            {
              title: "Nro de Documento",
              field: "dni",
            },
            {
              title: "Correo",
              field: "email",
            },
            {
              title: "Rol",
              field: "role",
            },
          ]}
          data={user}
          editable={{
            onRowDelete: (newData) => {
              return api
                ._delete(`/users/${newData.dni}`)
                .then((data) => {
                  debugger
                  props.deleteUser(newData);
                  enqueueSnackbar(
                    "EL usuario " + name + " fue eliminado con exito ",
                    {
                      variant: "success",
                    }
                  );
                })
                .catch((err) => {
                  enqueueSnackbar(
                    "Error, EL usuario no  fue eliminado. " + err.msg,
                    {
                      variant: "error",
                    }
                  );
                  console.error("Mutation error:", err);
                });
            },
          }}
          icons={tableIcons}
          localization={{
            header: {
              actions: "Acciones",
            },
            body: {
              emptyDataSourceMessage: "No hay ningun usuario cargado",
            },
            toolbar: {
              searchPlaceholder: "Buscar",
            },
          }}
        />
      </>
    </Container>
  );
};
const mapStateToProps = (state) => {
  return { user: state.user };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => dispatch(setUser(user)),
    editUser: (user) => dispatch(editUser(user)),
    deleteUser: (user) => dispatch(deleteUser(user)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TableUser));
