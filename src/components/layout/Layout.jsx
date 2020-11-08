import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Navbar from './Navbar';
import Footer from './Footer';

const useStyles = makeStyles((theme) => ({
  main: { minHeight: '100vh', backgroundColor: '#f2f2f2' },
  offset: theme.mixins.toolbar,
}));

const Layout = (props) => {
  const { children } = props;
  const classes = useStyles();
  return (
    <>
      <Navbar />
      <div className={classes.main}>
        <div className={classes.offset}></div>
        {children}
      </div>
      <Footer />
    </>
  );
};

export default Layout;
