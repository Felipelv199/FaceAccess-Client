import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Container, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { menu } from '../../routes/routes.json';

const useStyles = makeStyles((theme) => ({
  conatiner: { height: '100vh' },
  gridButton: { marginTop: theme.spacing(10) },
}));

const Hero = () => {
  const classes = useStyles();
  const history = useHistory();
  const uploadButtonHandler = (e) => {
    e.preventDefault();
    history.push(menu);
  };
  return (
    <Grid
      container
      justify="center"
      alignContent="center"
      className={classes.conatiner}
    >
      <Container>
        <Grid
          container
          direction="column"
          justify="center"
          alignContent="center"
        >
          <Typography variant="h1" align="center">
            Face Access
          </Typography>
          <Typography variant="h4" align="center">
            Sube una foto y diviertete.
          </Typography>
        </Grid>
        <Grid
          container
          justify="center"
          alignContent="center"
          className={classes.gridButton}
        >
          <Button
            color="secondary"
            variant="contained"
            size="large"
            onClick={uploadButtonHandler}
          >
            Empieza
          </Button>
        </Grid>
      </Container>
    </Grid>
  );
};

export default Hero;
