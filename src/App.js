import React, { useState, useEffect } from 'react'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import TakeStats from './pages/takeStats';
import ViewInsights from './pages/viewInsights';
import ManageTeam from './pages/manageTeam';
import Home from './pages/home';
import Firebase, { FirebaseContext } from './firebase';
import * as Cruncher from './numberCrunchers/index';
const globalDate = new Date();
const globalFirebase = new Firebase();


const App = function () {
  const [players, setPlayers] = useState([]);
  const addStatToPlayer = (stat) => {
    setPlayers(players => {
      if (players) {
        players.forEach(player => {
          if (player.playerName === stat.playerName) {
            if (stat.statName === 'Diving') {  //get neutrals
              player.neutralStats = [...player.neutralStats, stat];
            } else if (stat.statName === 'Competitive' && !stat.isPositive) {
              player.neutralStats = [...player.neutralStats, stat];
            } else if (stat.isPositive) {
              player.positiveStats = [...player.positiveStats, stat];
            } else {   //get negatives
              player.negativeStats = [...player.negativeStats, stat];
            }
          }
        });
      }
    })
  };
  const [sport] = useState('Baseball');
  const [days, setDay] = useState([]);
  const [currentWeek, updateCurrentWeek] = useState([]);
  const [setStats] = useState([]);
  const [dateShown, setDate] = useState(globalDate);
  const addAdditionalPlayer = (player) => { setPlayers(players => players.concat(player)) };
  const addAdditionalDay = (dayString) => { setDay(days => days.concat(dayString)) };
  const deleteStat = (stat) => { setDay(stats => stats.filter(obj => obj.statID !== stat.statID)) }


  const changeDate = (value) => { setDate(value) }

  const getPlayers = () => {
    globalFirebase.db.collection("players").get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        let player = {
          teamID: doc.data().teamID,
          playerName: doc.data().playerName,
          playerID: doc.data().playerID,
          positiveStats: [],
          negativeStats: [],
          neutralStats: [],
          successPercentage: -1,
        }
        addAdditionalPlayer(player);
        players.push(player);
      });
      let dayString = Cruncher.dateToString(globalDate);
      getDayStats(dayString);
    });
  }


  async function getDayStats(dayString) {
    let stats = [];

    globalFirebase.db.collection(dayString).get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        let stat = {
          playerName: doc.data().playerName,
          createdAt: doc.data().createdAt,
          statName: doc.data().statName,
          isPositive: doc.data().isPositive,
          statID: doc.data().statID,
        }
        stats.push(stat);
        //addStatToPlayer(stat);
        players.forEach(player => {
          if (player.playerName === doc.data().playerName) {
            if (doc.data().statName === 'Diving') {  //get neutrals
              player.neutralStats.push(stat);
            } else if (doc.data().statName === 'Competitive' && !doc.data().isPositive) {
              player.neutralStats.push(stat);
            } else if (doc.data().isPositive) {
              player.positiveStats.push(stat);
            } else {   //get negatives
              player.negativeStats.push(stat);
            }
          }
        });
      });

      players.forEach(player => {
        let totalStats = player.positiveStats.length + player.negativeStats.length + player.neutralStats.length;
        player.successPercentage =
          totalStats > 0 && player.positiveStats.length > 0 ? (player.positiveStats.length / totalStats).toFixed(2) * 100 : 0;
      });

      setPlayers(players.sort(function (a, b) {
        return b.successPercentage - a.successPercentage;
      }))
      setDay(stats);
    });
  }


  useEffect(() => {
    getPlayers();
  }, []);

  return (
    <FirebaseContext.Provider value={{
      firebase: globalFirebase,
      dateShown,
      dayString: Cruncher.dateToString(globalDate),
      changeDate,
      sport,
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
      days,
      setDay,
      currentWeek,
      updateCurrentWeek,
      addAdditionalDay,
      deleteStat,
      players,
      setPlayers,
      addAdditionalPlayer,
    }}>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/take" component={TakeStats} />
          <Route path="/view" component={ViewInsights} />
          <Route path="/manage" component={ManageTeam} />
        </Switch>
      </Router>
    </FirebaseContext.Provider>
  );
}


// const WholeApp = connect(
//   null,
//   mapDispatchToProps
// )(App);

export default App;
