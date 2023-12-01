import React from "react";
import MaterialTable from "material-table";
import { connect } from "react-redux";
import api from "../../utils/api";
import {
  Container,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { useSnackbar } from "notistack";

import tableIcons from "../../forms/icons";
import { deleteUser, setUser, editUser } from "../../actions/index";
import FormUser from "../../forms/formUser";

const userInfo: IUser =
{
  surname: "",
  email: "",
  role: "",
  name: "",
  dni: "",
  age: "",
  phone: "",
  tableData: "",
}
const TableUser = (props: any) => {
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
              "EL usuario " + name + " fue guardada con exito ",
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
  return (
    <Container style={{ marginTop: '25px' }}>
      <>
        {<FormUser setUserData={setUserData} userData={userData} handleClose={handleClose} submitting={submitting} open={open} handleSubmit={handleSubmit} />}
        <MaterialTable
          actions={[
            {
              icon: () => <span><tableIcons.Add/></span>,
              onClick: () => {
                setUserData(userInfo);
                setOpen(true);
                setValue(false);
              },
              isFreeAction: true,
              tooltip: "Nuevo Usuario",
            },
            {
              icon: () => <span>{<tableIcons.Edit/>}</span>,
              onClick: (event: any, rowData: any) => {
                setUserData(rowData);
                setOpen(true);
                setValue(true);
              },
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
const mapStateToProps = (state: any) => {
  return { user: state?.user };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setUser: (user: IUser) => dispatch(setUser(user)),
    editUser: (user: IUser) => dispatch(editUser(user)),
    deleteUser: (user: IUser) => dispatch(deleteUser(user)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TableUser));
