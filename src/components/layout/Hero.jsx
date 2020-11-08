import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { upload } from '../../routes/routes.json';

const useStyles = makeStyles((theme) => ({
  conatiner: { height: '100vh' },
}));

const Hero = () => {
  const classes = useStyles();
  const history = useHistory();
  const uploadButtonHandler = (e) => {
    e.preventDefault();
    history.push(upload);
  };
  return (
    <Grid
      container
      justify="center"
      alignContent="center"
      className={classes.conatiner}
    >
      <Grid item xs={12}>
        <Typography variant="h1" align="center">
          Face Access
        </Typography>
        <Typography variant="h4" align="center">
          Sube una foto tuya y diviertete.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container justify="center">
          <Button
            color="secondary"
            variant="contained"
            size="large"
            onClick={uploadButtonHandler}
          >
            SUBE UNA IMAGEN
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Hero;
