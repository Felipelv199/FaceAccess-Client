import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './views/Home';
import { About } from './views/About';
import { Upload } from './views/Upload';
import { Recognize } from './views/Recognize';

function App() {
  return (
    <React.Fragment>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path={'/'} render={(props) => <Home {...props} />} />
          <Route
            exact
            path={'/about'}
            render={(props) => <About {...props} />}
          />
          <Route
            exact
            path={'/upload'}
            render={(props) => <Upload {...props} />}
          />
          <Route
            exact
            path={'/recognize'}
            render={(props) => <Recognize {...props} />}
          />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
