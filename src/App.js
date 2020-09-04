import React, { useEffect, Component, useState } from 'react'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import TakeStats from './pages/takeStats';
import ViewInsights from './pages/viewInsights';
import ManageTeam from './pages/manageTeam';
import Home from './pages/home';
import { addStat, addPlayer } from './js/actions/index';
import { connect } from 'react-redux';
//import firebase from 'firebase';
import * as Cruncher from './numberCrunchers';
import Firebase, { FirebaseContext } from './firebase'
const globalFirebase = new Firebase();
const globalDate = new Date();


//const MyContext = Cont.MyContext;

// Then create a provider Component
// class MyProvider extends Component {
//   state = {
//     teamName: 'Nebraska',
//     sport: 'Baseball',
//     players: [],
//     statCategories: [
//       'Throwing',
//       'Fielding',
//       'Picks',
//       'Awareness',
//       'Competitive',
//       'Diving',
//       'Ball On Ground',
//     ],
//     stats: [],
//   }
//   render() {
//     return (
//       <FirebaseContext.Provider value={new Firebase()}>
//         {this.props.children}
//       </FirebaseContext.Provider>
//     )
//   }
// }


// function mapDispatchToProps(dispatch) {
//   return {
//     addStat: stat => dispatch(addStat(stat)),
//     addPlayer: player => dispatch(addPlayer(player))
//   };
// }

const App = function () {
  const [players, setPlayers] = useState([]);
  const [sport, setSport] = useState('Baseball');
  const [stats, setStats] = useState([]);
  const [dateShown, setDate] = useState(globalDate);
  const addAdditionalPlayer = (player) => { setPlayers(players => players.concat(player)) };
  const addAdditionalStat = (stat) => { setStats(stats => stats.concat(stat)) };
  const deleteStat = (stat) => { setStats(stats => stats.filter(obj => obj.statID !== stat.statID)) }
  const changeDate = (value) => { setDate(value) }
  let databasePlayers = [];
  let databaseStats = [];


  useEffect(() => {
    //get the players
    globalFirebase.db.collection("players").get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        let player = {
          teamID: doc.data().teamID,
          playerName: doc.data().playerName,
          playerID: doc.data().playerID,
          stats: [],
        }
        databasePlayers.push(player);
      });
      databasePlayers.map(player => {
        addAdditionalPlayer(player.playerName);
      })
    });

    //get the stats
    globalFirebase.db.collection("stats").get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        let stat = {
          playerName: doc.data().playerName,
          createdAt: doc.data().createdAt,
          statName: doc.data().statName,
          isPositive: doc.data().isPositive,
          statID: doc.data().statID,
        }
        databaseStats.push(stat);
      });

      databaseStats.map(stat => {
        addAdditionalStat(stat);
      });
    });

  }, []);

  // let players = [];
  // let stats = [];

  // useEffect(() => {
  //   const db = firebase.firestore();
  //   db.collection("players").get().then(function (querySnapshot) {
  //     querySnapshot.forEach(function (doc) {
  //       let player = {
  //         teamID: doc.data().teamID,
  //         playerName: doc.data().playerName,
  //         playerID: doc.data().playerID,
  //         stats: [],
  //       }
  //       players.push(player);
  //     });
  //   });
  //   //check if the stat is today..
  //   db.collection("stats").get().then(function (querySnapshot) {
  //     querySnapshot.forEach(function (doc) {
  //       let stat = {
  //         playerName: doc.data().playerName,
  //         createdAt: doc.data().createdAt,
  //         statName: doc.data().statName,
  //         isPositive: doc.data().isPositive,
  //         statID: doc.data().statID,
  //       }
  //       stats.push(stat);
  //     });
  //   });
  // });
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
      stats,
      addAdditionalStat,
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
