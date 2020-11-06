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
    color: theme.palette.text.main,
    textDecoration: 'none',
  },
  button: {
    color: theme.palette.text.main,
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
            onClick={() => history.push(about)}
            className={classes.button}
          >
            About
          </Button>
          <Button
            variant="text"
            onClick={() => history.push(upload)}
            className={classes.button}
          >
            Upload
          </Button>
          <Button
            variant="text"
            onClick={() => history.push(recognize)}
            className={classes.button}
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
