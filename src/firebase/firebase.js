import * as firebase from "firebase";
//import firestore from "firebase/firestore";
import app from "firebase/app";

const config = {
  apiKey: "AIzaSyDpV6AFhyF4flK4EOBF1224RvFp2aBPYHg",
  authDomain: "statpracticetwo.firebaseapp.com",
  databaseURL: "https://statpracticetwo.firebaseio.com",
  projectId: "statpracticetwo",
  storageBucket: "statpracticetwo.appspot.com",
  messagingSenderId: "1022673235264",
  appId: "1:1022673235264:web:1e271d57c173aae82ddea5",
  measurementId: "G-9MXNXH7YXD"
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.db = firebase.firestore();
  }
  getTimestamp(date) {
    console.log(this.db);
    return firebase.firestore.Timestamp.fromDate(date);
  }
  // getAllPlayers = () => {
  //   let players = [];
  //   this.db.collection("players").get().then(function (querySnapshot) {
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
  //   return players;
  // }
  updateDateShown = (date) => {
    return -1;
  }
  addStatToDatabase = (stat) => {
    console.log('added!');
    // this.db.collection('stats').add(stat)
    //   .then(function (docRef) {
    //     //stat.documentID = docRef.id;
    //     console.log('added!');
    //     //addStat({ stat });
    //   })
    //   .catch(function (error) {
    //     alert('Error. Stat was not saved');
    //     console.error("Error adding document: ", error);
    //   });
  }
}

export default Firebase;