import React, { useState, useEffect } from 'react'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import TakeStats from './pages/takeStats';
import Home from './pages/home';
import Firebase, { FirebaseContext } from './firebase';
import * as Cruncher from './numberCrunchers/index';
const globalDate = new Date();
const globalFirebase = new Firebase();

//get players
//get team day stats


const App = function () {
  const [stats, setStats] = useState([]);
  const addStat = (stat) => { setStats(stats => stats.concat(stat)) };
  const deleteStat = (stat) => { setStats(stats => stats.filter(obj => obj.statID !== stat.statID)) }
  const addStatToDatabase = globalFirebase.functions.httpsCallable('addStatToDatabase');
  const deleteStatFromDatabase = globalFirebase.functions.httpsCallable('deleteStatFromDatabase');
  const callAllStatsForPlayer = globalFirebase.functions.httpsCallable('callAllStatsForPlayer');

  const callStatsInPeriod = globalFirebase.functions.httpsCallable('callStatsInPeriod');
  const callStatsInDay = globalFirebase.functions.httpsCallable('callStatsInDay');

  const [players, setPlayers] = useState([]);
  const addPlayer = (player) => { setPlayers(players => players.concat(player)) };
  const deletePlayer = (player) => { setPlayers(players => players.concat(player)) };
  const callAllPlayers = globalFirebase.functions.httpsCallable('callAllPlayers');
  const addPlayerToDatabase = globalFirebase.functions.httpsCallable('addPlayer');

  const [dateShown, setDate] = useState(globalDate);
  const changeDate = (value) => { setDate(value) }

  const [dateRange, setDateRange] = useState(1);

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
      dayString: Cruncher.dateToString(globalDate),
      changeDate,
      stats,
      setStats,
      addStat,
      deleteStat,
      addStatToDatabase,
      deleteStatFromDatabase,
      callAllStatsForPlayer,
      callStatsInPeriod,
      callStatsInDay,
      players,
      setPlayers,
      addPlayer,
      deletePlayer,
      callAllPlayers,
      addPlayerToDatabase,
      dateRange,
      setDateRange,
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
