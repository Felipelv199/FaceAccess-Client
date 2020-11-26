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
import swal from 'sweetalert';
import { menu } from '../../routes/routes.json';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100%',
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
  const [name, setName] = useState('');
  const [image, setImage] = useState({ url: '', file: '' });
  const [fieldError, setFieldError] = useState(false);
  const getName = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setName(value);
  };
  const getImage = (e) => {
    e.preventDefault();
    const { files } = e.target;
    if (files.length > 0) {
      const url = URL.createObjectURL(files[0]);
      const file = files[0];
      setImage({ url, file });
    }
  };
  const uploadImage = async (e) => {
    e.preventDefault();
    const { file } = image;
    if (file !== '' && name !== '') {
      setFieldError(false);
      let formData = new FormData();
      formData.append('name', name);
      formData.append('image', file);
      const response = await fetch('http://localhost:8080/upload-file', {
        method: 'POST',
        body: formData,
      });
      await response.json();
      await swal(
        'Imagen Cargada',
        'La imagen ya se encuentra cargada en nuestra base de datos',
        'success'
      );
      history.push(menu);
    } else {
      setFieldError(true);
      await swal(
        'Error al subir imagen',
        'No agregaste una imagen o no escribiste tu nombre',
        'warning'
      );
    }
  };
  return (
    <Container maxWidth="sm" className={classes.container}>
      <Grid
        container
        justify="center"
        alignContent="center"
        className={classes.container}
      >
        <Paper className={classes.paper}>
          <Grid container justify="center" alignContent="center">
            <Typography variant="h4" align="center">
              Sube Una Foto
            </Typography>
            <Paper
              variant="outlined"
              className={image.url === '' ? classes.boxPaper : ''}
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
                  {image.url === '' ? 'Seleccionar Imagen' : 'Cambiar Imagen'}
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
                <TextField
                  label="Nombre Completo"
                  color="primary"
                  error={fieldError}
                  onChange={getName}
                />
              </Grid>
            </Grid>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={uploadImage}
            >
              Subir Imagen
            </Button>
          </Grid>
        </Paper>
      </Grid>
    </Container>
  );
}

export default UploadField;
