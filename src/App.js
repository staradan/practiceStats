import React, { useEffect } from 'react'
import axios from 'axios';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import TakeStats from './pages/takeStats';
import ViewInsights from './pages/viewInsights';
import ManageTeam from './pages/manageTeam';
import Home from './pages/home';


const App = function () {
  useEffect(() => {
    axios
      .get("http://localhost:5000/stats")
      .then((stats) => console.log(stats))
      .catch((err) => console.log(err));
  }, []);
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
    </div>
  );
}

export default App;
