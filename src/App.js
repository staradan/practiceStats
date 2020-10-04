import React, { useState } from 'react'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import TakeStats from './pages/takeStats';
import Home from './pages/home';
import Firebase, { FirebaseContext } from './firebase';
const globalDate = new Date();
const globalFirebase = new Firebase();

const App = function () {
  //the app kind of runs on the idea of a single list of stats
  const [stats, setStats] = useState([]);
  //need these functions because you're updating an array
  const addStat = (stat) => { setStats(stats => stats.concat(stat)) };
  const deleteStat = (stat) => { setStats(stats => stats.filter(obj => obj.statID !== stat.statID)) }

  const [viewOnlyStats, setViewOnlyStats] = useState([]);

  const [players, setPlayers] = useState([]);
  const [dateShown, setDate] = useState(globalDate);
  const [dateRange, setDateRange] = useState(1);

  //firebase database calls that get passed around
  const callAllPlayers = globalFirebase.functions.httpsCallable('callAllPlayers');
  const addStatToDatabase = globalFirebase.functions.httpsCallable('addStatToDatabase');
  const callStatsInPeriod = globalFirebase.functions.httpsCallable('callStatsInPeriod');
  const newGetStatsInPeriod = globalFirebase.functions.httpsCallable('newGetStatsInPeriod');

  return (
    <FirebaseContext.Provider value={{
      school: 'Nebraska',
      categories: [
        'Throwing',
        'Fielding',
        'Picks',
        'Awareness',
        'Competitive',
        'Diving',
        'Ball On Ground',
      ],
      firebase: globalFirebase,
      dateShown,
      setDate,
      stats,
      setStats,
      addStat,
      deleteStat,
      addStatToDatabase,
      callStatsInPeriod,
      players,
      setPlayers,
      callAllPlayers,
      dateRange,
      setDateRange,
      newGetStatsInPeriod,
      viewOnlyStats,
      setViewOnlyStats,
    }}>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/take" component={TakeStats} />
        </Switch>
      </Router>
    </FirebaseContext.Provider>
  );
}

export default App;
