import React, { useState, useEffect } from 'react'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import TakeStats from './pages/takeStats';
import ViewInsights from './pages/viewInsights';
import ManageTeam from './pages/manageTeam';
import Home from './pages/home';
import Firebase, { FirebaseContext } from './firebase';
const globalDate = new Date();
const globalFirebase = new Firebase();




const App = function () {
  const [players, setPlayers] = useState([]);
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
          stats: [],
        }
        addAdditionalPlayer(player.playerName);
        players.push(player);
      });
    });
  }

  useEffect(() => {
    getPlayers();
  }, []);

  return (
    <FirebaseContext.Provider value={{
      firebase: globalFirebase,
      dateShown,
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
