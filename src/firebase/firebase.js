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
    this.analytics = firebase.analytics();
  }
  getTimestamp(date) {
    return firebase.firestore.Timestamp.fromDate(date);
  }
}

export default Firebase;