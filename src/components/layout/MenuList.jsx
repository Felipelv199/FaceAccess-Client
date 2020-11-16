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
import { about, menu } from '../../routes/routes.json';

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
            }}
          >
            <ListItemText>About</ListItemText>
          </ListItem>
          <ListItem
            button
            onClick={() => {
              history.push(menu);
            }}
          >
            <ListItemText>Menu</ListItemText>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}

export default MenuList;
