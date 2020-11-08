import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './views/Home';
import About from './views/About';
import Upload from './views/Upload';
import Recognize from './views/Recognize';
import { about, home, recognize, upload } from './routes/routes.json';
import Layout from './components/layout/Layout';
import theme from './assets/style/themeConfig';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

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
          </Switch>
        </Layout>
      </MuiThemeProvider>
    </BrowserRouter>
  );
}

export default App;
