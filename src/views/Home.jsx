import React from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  conatiner: {
    height: '100vh',
    padding: theme.spacing(20),
  },
}));

const Home = () => {
  const classes = useStyles();
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
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
      <Button color="secondary" variant="contained" size="large">
        SUBE UNA IMAGEN
      </Button>
    </Grid>
  );
};
export default Home;
