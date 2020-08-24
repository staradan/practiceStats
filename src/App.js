import React, { useEffect } from 'react'
import axios from 'axios';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import TakeStats from './pages/takeStats';
import ViewInsights from './pages/viewInsights';
import ManageTeam from './pages/manageTeam';
import Home from './pages/home';
import { addStat, addPlayer } from './js/actions/index';
import { connect } from 'react-redux';

function mapDispatchToProps(dispatch) {
  return {
    addStat: stat => dispatch(addStat(stat)),
    addPlayer: player => dispatch(addPlayer(player))
  };
}

const App = function ({ addStat, addPlayer }) {
  useEffect(() => {
    console.log('here');
    //get the players
    //get the stats
    //get the stat categories
    axios
      .get('http://104.248.232.231/stats')
      .then((stats) => {
        stats.data.map((stat) => {
          addStat({ stat });
        });
      })
      .catch((err) => console.log(err));


    axios
      .get('http://104.248.232.231/players')
      .then((players) => {
        players.data.map((player) => {
          console.log(player);
          addPlayer({ player });
        })
      })
      .catch((err) => console.log(err));


  }, [addStat, addPlayer]);
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


const WholeApp = connect(
  null,
  mapDispatchToProps
)(App);

export default WholeApp;
