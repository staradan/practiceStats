import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './tailwind.generated.css';
import { Provider } from 'react-redux'
import store from './js/store/index.js'
import index from "./js/index";
import firebase from 'firebase';

firebase.initializeApp({
  apiKey: "AIzaSyDpV6AFhyF4flK4EOBF1224RvFp2aBPYHg",
  authDomain: "statpracticetwo.firebaseapp.com",
  databaseURL: "https://statpracticetwo.firebaseio.com",
  projectId: "statpracticetwo",
  storageBucket: "statpracticetwo.appspot.com",
  messagingSenderId: "1022673235264",
  appId: "1:1022673235264:web:1e271d57c173aae82ddea5",
  measurementId: "G-9MXNXH7YXD"
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
