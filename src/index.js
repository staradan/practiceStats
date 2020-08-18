import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './tailwind.generated.css';
import { Provider } from 'react-redux'
import store from './js/store/index.js'
import index from "./js/index";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
