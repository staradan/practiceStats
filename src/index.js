import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './tailwind.generated.css';
const cors = require('cors')({ origin: true });


ReactDOM.render(
  <App />,
  document.getElementById('root')
);
