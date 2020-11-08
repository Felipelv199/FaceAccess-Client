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
        <Button color={'secondary'} onClick={() => history.push(about)}>
          About
        </Button>
      </Grid>
      <Grid item>
        <Button color={'secondary'} onClick={() => history.push(upload)}>
          Upload
        </Button>
      </Grid>
      <Grid item>
        <Button color={'secondary'} onClick={() => history.push(recognize)}>
          Recognize
        </Button>
      </Grid>
    </Grid>
  );
};

export default Footer;
