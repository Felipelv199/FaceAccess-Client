import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import {
  AppBar,
  Button,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { about, home, recognize, upload } from '../../routes/routes.json';

const useStyles = makeStyles((theme) => ({
  offset: theme.mixins.toolbar,
  title: {
    flexGrow: 1,
  },
  link: {
    color: '#fff',
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
              <Typography variant="h6">Face Access</Typography>
            </Link>
          </div>
          <Button
            variant="text"
            color="inherit"
            onClick={() => history.push(home)}
          >
            Home
          </Button>
          <Button
            variant="text"
            color="inherit"
            onClick={() => history.push(about)}
          >
            About
          </Button>
          <Button
            variant="text"
            color="inherit"
            onClick={() => history.push(upload)}
          >
            Upload
          </Button>
          <Button
            variant="text"
            color="inherit"
            onClick={() => history.push(recognize)}
          >
            Recognize
          </Button>
        </Toolbar>
      </AppBar>
      <div className={classes.offset}></div>
    </>
  );
};
export default Navbar;
