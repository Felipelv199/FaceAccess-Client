import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import aws from 'aws-sdk';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import Home from './views/Home';
import About from './views/About';
import Upload from './views/Upload';
import Recognize from './views/Recognize';
import Menu from './views/Menu';
import { about, home, recognize, upload, menu } from './routes/routes.json';
import Layout from './components/layout/Layout';
import theme from './assets/style/themeConfig';

aws.config.update({
  region: 'eu-west-1',
  accessKeyId: process.env.REACT_APP_DEV_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_DEV_AWS_SECRET_ACCESS_KEY_ID,
});

function App() {
  return (
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <Layout>
          <Switch>
            <Route exact path={home} component={Home} />
            <Route exact path={about} component={About} />
            <Route exact path={upload} component={Upload} />
            <Route exact path={recognize} component={Recognize} />
            <Route exact path={menu} component={Menu} />
          </Switch>
        </Layout>
      </MuiThemeProvider>
    </BrowserRouter>
  );
}

export default App;
