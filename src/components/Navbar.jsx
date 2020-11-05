import React from 'react';
import {
  AppBar,
  Button,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  offset: theme.mixins.toolbar,
  title: {
    flexGrow: 1,
  },
}));

export function Navbar() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Face Access
          </Typography>
          <Button variant="text" color="inherit" href="/">
            Home
          </Button>
          <Button variant="text" color="inherit" href="/about">
            About
          </Button>
          <Button variant="text" color="inherit" href="/upload">
            Upload
          </Button>
          <Button variant="text" color="inherit" href="/recognize">
            Recognize
          </Button>
        </Toolbar>
      </AppBar>
      <div className={classes.offset}></div>
    </React.Fragment>
  );
}
