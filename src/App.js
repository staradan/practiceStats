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
import * as Cont from './context/contextInit'
import Firebase, { FirebaseContext } from './firebase'
const globalFirebase = new Firebase();


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


function mapDispatchToProps(dispatch) {
  return {
    addStat: stat => dispatch(addStat(stat)),
    addPlayer: player => dispatch(addPlayer(player))
  };
}



async function getStats() {
  //let firebase = new Firebase();
  //console.log(firebase);
  //const players = await Firebase.db.collection("players").get();
  // let players = [];
  // console.log('hey', Firebase.d, players);
}

const App = function () {
  const [sport, setSport] = useState('Baseball');
  const [players, setPlayers] = useState(['Dan', 'Trent', 'Javier', 'Baez']);
  const changeSport = () => { setSport('Soccer') };
  const addAdditionalPlayer = () => { setPlayers(players => players.concat('dude')) };

  getStats();
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
      stats: [],
      dateShown: new Date(),
      sport,
      changeSport,
      players,
      addAdditionalPlayer,
      setPlayers,
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


const WholeApp = connect(
  null,
  mapDispatchToProps
)(App);

export default WholeApp;
