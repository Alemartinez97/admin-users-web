import React, { FunctionComponent } from "react";
import clsx from "clsx";
import { ChevronLeft, ChevronRight, Menu as MenuIcon } from "@material-ui/icons";
import {
  ListItemIcon, ListItem, Divider,
  Typography, IconButton, List, Toolbar, AppBar, CssBaseline, Drawer,
  useTheme
} from "@material-ui/core";
import { RouteComponentProps, withRouter } from "react-router-dom";

import { useStyles } from "./style";

const Menu: FunctionComponent<RouteComponentProps> = ({ history }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const logout = () => {
    localStorage.clear();
    history.push("/login");
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography noWrap>Usuarios</Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeft />
            ) : (
              <ChevronRight />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button></ListItem>
          <ListItem button>
            <ListItemIcon onClick={() => history.push("/users")}>
              Usuarios
            </ListItemIcon >
          </ListItem>
          <ListItem button>
            <ListItemIcon onClick={() => logout()}>
              Cerrar Sesion
            </ListItemIcon>
          </ListItem>
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
      </main>
    </div>
  );
};
export default withRouter(Menu);
