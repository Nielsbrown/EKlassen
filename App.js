import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import ClassSelection from './pages/ClassSelection';
import ClassDetails from './pages/ClassDetails';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/profile" component={Profile} />
        <Route path="/classes" component={ClassSelection} />
        <Route path="/class/:id" component={ClassDetails} />
      </Switch>
    </Router>
  );
}

export default App;