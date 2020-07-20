import React from 'react';
import { Route, Link, Switch, BrowserRouter as Router } from 'react-router-dom'
import TakeStats from './pages/takeStats';
import ViewInsights from './pages/viewInsights';
import ManageTeam from './pages/manageTeam';
import Home from './pages/home';


function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/take" component={TakeStats} />
          <Route path="/view" component={ViewInsights} />
          <Route path="/manage" component={ManageTeam} />
        </Switch>
      </Router>
      <div className="absolute bottom-0 h-1 w-full bg-red-600"></div>
    </div>
  );
}

export default App;
