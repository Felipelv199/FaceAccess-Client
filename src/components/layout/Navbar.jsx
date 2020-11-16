import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import {
  AppBar,
  Button,
  Hidden,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';
import MenuList from '../layout/MenuList';
import { about, home, menu } from '../../routes/routes.json';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  link: {
    color: theme.palette.text.main,
    textDecoration: 'none',
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <>
      <AppBar>
        <Toolbar>
          <div className={classes.title}>
            <Link to={home} className={classes.link}>
              <Typography variant="h5">Face Access</Typography>
            </Link>
          </div>
          <Hidden mdDown>
            <Button
              variant="text"
              onClick={() => history.push(about)}
              color="secondary"
            >
              Sobre Nosotros
            </Button>
            <Button
              variant="text"
              onClick={() => history.push(menu)}
              color="secondary"
            >
              Menu
            </Button>
          </Hidden>
          <Hidden lgUp>
            <MenuList />
          </Hidden>
        </Toolbar>
      </AppBar>
    </>
  );
};
export default Navbar;
