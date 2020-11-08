import React, { useState } from 'react';
import { useHistory } from 'react-router';
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
} from '@material-ui/core';
import { Close, Menu } from '@material-ui/icons';
import { about, upload, recognize } from '../../routes/routes.json';

function MenuList() {
  const history = useHistory();
  const [drawerDisplayed, setDrawerDisplayed] = useState(false);
  const displayDrawerHandler = (e) => {
    e.preventDefault();
    setDrawerDisplayed(!drawerDisplayed);
  };
  return (
    <>
      <IconButton color="inherit" onClick={displayDrawerHandler}>
        <Menu />
      </IconButton>
      <Drawer
        anchor="right"
        open={drawerDisplayed}
        onClose={displayDrawerHandler}
      >
        <Toolbar>
          <IconButton color="inherit" onClick={displayDrawerHandler}>
            <Close />
          </IconButton>
        </Toolbar>
        <List>
          <ListItem
            button
            onClick={() => {
              history.push(about);
              setDrawerDisplayed(false);
            }}
          >
            <ListItemText>About</ListItemText>
          </ListItem>
          <ListItem
            button
            onClick={() => {
              history.push(upload);
              setDrawerDisplayed(false);
            }}
          >
            <ListItemText>Upload</ListItemText>
          </ListItem>
          <ListItem
            button
            onClick={() => {
              history.push(recognize);
              setDrawerDisplayed(false);
            }}
          >
            <ListItemText>Recognize</ListItemText>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}

export default MenuList;
