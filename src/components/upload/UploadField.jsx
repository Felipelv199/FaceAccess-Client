import React, { useState } from 'react';
import { Typography, Grid, Paper, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  conatiner: {
    height: '100vh',
  },
  paper: { padding: theme.spacing(5) },
  imageField: {
    border: '',
  },
}));

function UploadField() {
  const classes = useStyles();
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
    <Grid
      container
      alignItems="center"
      justify="center"
      className={classes.conatiner}
    >
      <Paper className={classes.paper}>
        <Grid container justify="center" alignContent="center">
          <Typography variant={'h3'}>Sube Una Fotografia</Typography>
          <Grid item xs={12}>
            {image.url !== '' ? (
              <img alt="Foto" src={image.url} width="300" />
            ) : null}
          </Grid>
          <Grid item xs={12}>
            <Grid container justify="center">
              <TextField label="Nombre" />
            </Grid>
          </Grid>
          <Button variant="outlined" component="label">
            Añadir Imagen
            <TextField
              type="file"
              style={{ display: 'none' }}
              accept="image/*"
              capture
              onChange={getImage}
            />
          </Button>
        </Grid>
      </Paper>
    </Grid>
  );
}

export default UploadField;
