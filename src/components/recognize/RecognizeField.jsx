import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Avatar,
  Button,
  CircularProgress,
  Container,
  Dialog,
  Fab,
  Grid,
  IconButton,
  Paper,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import {
  ArrowBack,
  CancelPresentation,
  Check,
  Close,
} from '@material-ui/icons';
import { upload, menu } from '../../routes/routes.json';

const useStyles = makeStyles((theme) => ({
  container: { height: '100%' },
  gridContainer: { height: '100%', position: 'relative' },
  paperContainer: { width: '80%', height: '150px' },
  boxContainer: { width: '100%', height: '100%', position: 'relative' },
  video: {
    position: 'absolute',
    marginTop: '25%',
  },
  uploadBox: {
    position: 'absolute',
  },
}));

function RecognizeField() {
  const history = useHistory();
  const classes = useStyles();
  const [stream, setStream] = useState(null);
  const [, setSeconds] = useState(0);
  const [access, setAccess] = useState(false);
  const [denied, setDenied] = useState(false);
  const [name, setName] = useState('');

  const getVideo = async (e) => {
    e.preventDefault();
    if (!stream) {
      navigator.getMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia;
      console.log(document.querySelector('#vid'));

      navigator.getMedia(
        {
          video: true,
        },
        function (newStream) {
          document.querySelector('#vid').srcObject = newStream;
          setStream(newStream);
        },

        function (err) {
          console.log('Ocurrió el siguiente error: ' + err);
        }
      );
    }
  };

  const cancelVideo = (e) => {
    e.preventDefault();
    if (!stream) {
      return;
    }
    stream.getTracks().forEach((track) => {
      track.stop();
      document.getElementById('vid').srcObject = null;
      setStream(null);
    });
  };

  const getVideoFrame = useCallback(async (stream) => {
    stream.getTracks().map(async (track) => {
      const imageCapture = new ImageCapture(track);
      const blob = await imageCapture.takePhoto();
      const url = URL.createObjectURL(blob);
      const formData = new FormData();
      formData.append('image', blob);
      formData.append('url', url);
      const response = await fetch('http://localhost:8080/recognice-face', {
        method: 'POST',
        body: formData,
      });
      const responseJson = await response.json();
      if (responseJson.name) {
        setName(responseJson.name);
        track.stop();
        document.getElementById('vid').srcObject = null;
        setStream(null);
        setAccess(true);
      } else {
        track.stop();
        document.getElementById('vid').srcObject = null;
        setStream(null);
        setDenied(true);
      }
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (stream) {
        getVideoFrame(stream);
      }
      setSeconds((seconds) => seconds + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, [stream, getVideoFrame]);

  return (
    <Container maxWidth="sm" className={classes.container}>
      <Grid
        justify="center"
        alignContent="center"
        container
        className={classes.gridContainer}
      >
        <video id="vid" autoPlay className={classes.video}></video>
        {stream ? (
          <Grid item style={{ height: '100%' }}>
            <Grid
              container
              justify="center"
              alignContent="center"
              style={{ height: '100%' }}
            >
              <Fab variant="extended" disabled>
                <CircularProgress color="secondary" />
                <Typography color="secondary">Esaneando...</Typography>
              </Fab>
              <Fab color="primary" onClick={cancelVideo}>
                <CancelPresentation />
              </Fab>
            </Grid>
          </Grid>
        ) : (
          <Paper style={{ width: '100%', padding: '25px' }}>
            <Grid container justify="center">
              <Grid item xs={12}>
                <IconButton onClick={() => history.push(menu)}>
                  <ArrowBack />
                </IconButton>
              </Grid>
              <Typography variant="h3" align="center">
                Recognize
              </Typography>
              <Paper
                variant="outlined"
                style={{
                  width: '100%',
                  height: '225px',
                  padding: '10px',
                  marginBottom: '10px',
                }}
              >
                <Grid
                  container
                  justify="center"
                  alignContent="center"
                  style={{ height: '100%' }}
                >
                  <Typography variant="body1" color="primary" align="center">
                    Si ya subio una foto escanee su rostro para consederle
                    acceso o de click en el boto para subirla
                  </Typography>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => history.push(upload)}
                  >
                    Sube una imagen
                  </Button>
                </Grid>
              </Paper>
              <Button variant="contained" color="secondary" onClick={getVideo}>
                Escanear
              </Button>
            </Grid>
          </Paper>
        )}
      </Grid>
      <Dialog open={access}>
        <Grid
          container
          justify="center"
          alignContent="center"
          style={{ padding: '30px' }}
        >
          <Fab size="large" color="primary" style={{ marginBottom: '25px' }}>
            <Check></Check>
          </Fab>
          <Grid item xs={12}>
            <Typography variant="h3" align="center">
              Acceso Concedido
            </Typography>
          </Grid>
          <Grid item xs={12} style={{ marginBottom: '50px' }}>
            <Typography variant="h5" align="center">
              Es bueno tenerte verte de vuelta
            </Typography>
          </Grid>
          <Avatar style={{ height: '75px', width: '75px' }} />
          <Grid item xs={12} style={{ marginBottom: '50px' }}>
            <Typography variant="h5" align="center">
              {name}
            </Typography>
          </Grid>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              history.push(menu);
            }}
          >
            Entrar
          </Button>
        </Grid>
      </Dialog>
      <Dialog open={denied}>
        <Grid
          container
          justify="center"
          alignContent="center"
          style={{ padding: '30px' }}
        >
          <Fab
            size="large"
            color="primary"
            disabled
            style={{ marginBottom: '25px' }}
          >
            <Close></Close>
          </Fab>
          <Grid item xs={12}>
            <Typography variant="h3" align="center">
              Acceso Denegado
            </Typography>
          </Grid>
          <Grid item xs={12} style={{ marginBottom: '50px' }}>
            <Typography align="center">
              No te tenemos registrado en nuestra base de datos, sube una imagen
              y vuelve a intentarlo
            </Typography>
          </Grid>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              history.push(upload);
            }}
          >
            Subir Imagen
          </Button>
        </Grid>
      </Dialog>
      <canvas id="2d"></canvas>
    </Container>
  );
}

export default RecognizeField;
