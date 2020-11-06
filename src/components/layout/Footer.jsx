import React from 'react';
import { useHistory } from 'react-router-dom';
import { about, upload, recognize } from '../../routes/routes.json';
import { Grid, makeStyles, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.primary.main,
    width: '100%',
    height: '150px',
  },
  button: {
    color: theme.palette.text.main,
    textDecoration: 'none',
  },
}));

const Footer = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Grid
      container
      justify="center"
      alignContent="center"
      className={classes.footer}
    >
      <Grid item>
        <Button className={classes.button} onClick={() => history.push(about)}>
          About
        </Button>
      </Grid>
      <Grid item>
        <Button className={classes.button} onClick={() => history.push(upload)}>
          Upload
        </Button>
      </Grid>
      <Grid item>
        <Button
          className={classes.button}
          onClick={() => history.push(recognize)}
        >
          Recognize
        </Button>
      </Grid>
    </Grid>
  );
};

export default Footer;
