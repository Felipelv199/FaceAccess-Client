import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Card,
  CardActionArea,
  CardContent,
} from '@material-ui/core';
import { Publish, TagFaces } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import { upload, recognize } from '../../routes/routes.json';

const useStyles = makeStyles((theme) => ({
  container: { height: '100%' },
  gridContainer: { height: '100%' },
  cardActionArea: {
    height: '150px',
    backgroundColor: theme.palette.primary.main,
  },
  card: {
    maxWidth: '350px',
    marginTop: '25px',
  },
}));

function Dashboard() {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Container maxWidth="md" className={classes.container}>
      <Grid
        justify="center"
        alignContent="center"
        container
        className={classes.gridContainer}
      >
        <Grid item xs={12} sm={6}>
          <Card className={classes.card}>
            <CardActionArea
              className={classes.cardActionArea}
              onClick={() => history.push(upload)}
            >
              <Grid container justify="center">
                <Publish color="secondary" fontSize="large" />
              </Grid>
            </CardActionArea>
            <CardContent className={classes.cardContent}>
              <Typography align="center">Subir Imagenes</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card className={classes.card}>
            <CardActionArea
              className={classes.cardActionArea}
              onClick={() => history.push(recognize)}
            >
              <Grid container justify="center">
                <TagFaces color="secondary" fontSize="large" />
              </Grid>
            </CardActionArea>
            <CardContent>
              <Typography align="center">Reconocer</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;
