import React, { useState } from 'react';
import { useHistory } from 'react-router';
import {
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  Container,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { recognize } from '../../routes/routes.json';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100vh',
  },
  paper: { width: '100%', padding: theme.spacing(2) },
  button: { marginTop: theme.spacing(2) },
  boxPaper: {
    width: '300px',
    height: '300px',
  },
  imageContainer: {
    height: '100%',
  },
}));

function UploadField() {
  const classes = useStyles();
  const history = useHistory();
  const [image, setImage] = useState({ url: '', file: '' });
  const getImage = (e) => {
    e.preventDefault();
    const { files } = e.target;
    if (files.length > 0) {
      const url = URL.createObjectURL(files[0]);
      const file = files[0];
      setImage({ url, file });
    }
  };
  return (
    <Container maxWidth="sm">
      <Grid
        container
        className={classes.container}
        justify="center"
        alignContent="center"
      >
        <Paper className={classes.paper}>
          <Grid container justify="center" alignItems="center">
            <Typography variant={'h4'}>Sube Una Foto</Typography>
            <Paper
              variant="outlined"
              className={image.url === '' && classes.boxPaper}
            >
              {image.url !== '' ? (
                <img alt="Foto" src={image.url} width="300px" height="300px" />
              ) : (
                <Grid
                  container
                  justify="center"
                  alignContent="center"
                  className={classes.imageContainer}
                >
                  <Typography align="center">
                    La imagen o fotgrafía que subas se mostrara aqui.
                  </Typography>
                </Grid>
              )}
            </Paper>
            <Grid item xs={12}>
              <Grid container justify="center">
                <Button
                  variant="outlined"
                  component="label"
                  color="secondary"
                  className={classes.button}
                >
                  {image.url === '' ? 'Añadir Imagen' : 'Cambiar Imagen'}
                  <TextField
                    type="file"
                    style={{ display: 'none' }}
                    accept="image/*"
                    capture
                    onChange={getImage}
                  />
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container justify="center">
                <TextField label="Nombre Completo" color="primary" />
              </Grid>
            </Grid>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={() => history.push(recognize)}
            >
              Reconocer
            </Button>
          </Grid>
        </Paper>
      </Grid>
    </Container>
  );
}

export default UploadField;