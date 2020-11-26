import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Navbar from './Navbar';
import Footer from './Footer';

const useStyles = makeStyles((theme) => ({
  main: { height: '100vh', backgroundColor: '#f2f2f2' },
  offset: theme.mixins.toolbar,
  content: { height: '100%' },
}));

const Layout = (props) => {
  const { children } = props;
  const classes = useStyles();
  return (
    <>
      <Navbar />
      <div className={classes.main}>
        <div className={classes.offset}></div>
        <div className={classes.content}>{children}</div>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
