import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Button,
  CircularProgress,
  Container,
  Fab,
  Grid,
  IconButton,
  Paper,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { ArrowBack, CancelPresentation } from '@material-ui/icons';
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
  const [, setImg] = useState({ url: '', file: '' });
  const [, setSeconds] = useState(0);

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

        // errorCallback *Opcional
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
      let blob = await imageCapture.takePhoto();
      const url = URL.createObjectURL(blob);
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.responseType = 'blob';
      xhr.onload = function () {
        blob = xhr.response;
      };
      xhr.send();
      const file = new File([blob], 'frame.png');
      setImg({ url, file });
      console.log(file);
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
    </Container>
  );
}

export default RecognizeField;
