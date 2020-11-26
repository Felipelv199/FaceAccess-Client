import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Button,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { upload } from '../../routes/routes.json';

const useStyles = makeStyles((theme) => ({
  container: { height: '100%' },
  gridContainer: { width: '100%', height: '100%' },
  paperContainer: { width: '80%', height: '300px' },
  boxContainer: { width: '100%', height: '100%', position: 'relative' },
  video: { width: '100%', height: '100%' },
  uploadBox: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    padding: '10px',
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
      navigator.getMedia(
        {
          video: true,
        },
        function (newStream) {
          document.getElementById('vid').srcObject = newStream;
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
        className={classes.container}
      >
        <Paper>
          <Grid
            container
            justify="center"
            alignContent="center"
            className={classes.gridContainer}
          >
            <Grid item xs={12}>
              <Typography variant="h3" align="center">
                Recognize
              </Typography>
            </Grid>
            <Paper variant="outlined" className={classes.paperContainer}>
              <Grid
                container
                alignContent="center"
                className={classes.boxContainer}
              >
                <video id="vid" autoPlay className={classes.video}></video>
                <Grid
                  container
                  justify="center"
                  alignContent="center"
                  className={classes.uploadBox}
                >
                  {stream ? (
                    <>
                      <CircularProgress />
                      <Grid item xs={12}>
                        <Typography variant="h6" color="primary" align="center">
                          Escaneando...
                        </Typography>
                      </Grid>
                    </>
                  ) : (
                    <>
                      <Typography
                        variant="body1"
                        color="primary"
                        align="center"
                      >
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
                    </>
                  )}
                </Grid>
              </Grid>
            </Paper>
            <Grid item xs={12} style={{ marginTop: '20px', height: '50px' }}>
              <Grid justify="center" alignContent="center" container>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={cancelVideo}
                >
                  Cancelar Escaneo
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={getVideo}
                >
                  Escanear
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Container>
  );
}

export default RecognizeField;
