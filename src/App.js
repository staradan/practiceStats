import React, { useEffect } from 'react'
import axios from 'axios';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import TakeStats from './pages/takeStats';
import ViewInsights from './pages/viewInsights';
import ManageTeam from './pages/manageTeam';
import Home from './pages/home';
import { addStat, addPlayer } from './js/actions/index';
import { connect } from 'react-redux';
import firebase from 'firebase';

function mapDispatchToProps(dispatch) {
  return {
    addStat: stat => dispatch(addStat(stat)),
    addPlayer: player => dispatch(addPlayer(player))
  };
}

const App = function ({ addStat, addPlayer }) {

  useEffect(() => {
    const db = firebase.firestore();

    db.collection("stats").get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots

        let stat = {
          playerName: doc.data().playerName,
          createdAt: doc.data().createdAt,
          statName: doc.data().statName,
          isPositive: doc.data().isPositive,
          statID: doc.data().statID,
        }
        addStat({ stat });
      });
    });
    db.collection("players").get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        let player = {
          teamID: doc.data().teamID,
          playerName: doc.data().playerName,
          playerID: doc.data().playerID,
        }
        addPlayer({ player });
      });
    });


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
