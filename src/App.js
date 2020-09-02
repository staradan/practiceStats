import React, { useEffect } from 'react'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import TakeStats from './pages/takeStats';
import ViewInsights from './pages/viewInsights';
import ManageTeam from './pages/manageTeam';
import Home from './pages/home';
import { addStat, addPlayer } from './js/actions/index';
import { connect } from 'react-redux';
import firebase from 'firebase';
import * as Cruncher from './numberCrunchers';

function mapDispatchToProps(dispatch) {
  return {
    addStat: stat => dispatch(addStat(stat)),
    addPlayer: player => dispatch(addPlayer(player))
  };
}

const App = function ({ addStat, addPlayer }) {

  useEffect(() => {
    const db = firebase.firestore();
    db.collection("players").get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        let player = {
          teamID: doc.data().teamID,
          playerName: doc.data().playerName,
          playerID: doc.data().playerID,
          stats: [],
        }
        addPlayer({ player });
      });
    });
    //check if the stat is today..
    db.collection("stats").get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        let statDay = new Date(doc.data().createdAt.seconds * 1000);
        if (Cruncher.datesAreInRange(statDay, new Date(), 'day')) {
          let stat = {
            playerName: doc.data().playerName,
            createdAt: doc.data().createdAt,
            statName: doc.data().statName,
            isPositive: doc.data().isPositive,
            statID: doc.data().statID,
          }
          addStat({ stat });
        }
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
