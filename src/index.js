import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router} from 'react-router-dom';
import { StateProvider } from './Context/StateProvider';
import reducer from './Context/Reducer';
import { InitialState } from './Context/InitialState';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <StateProvider InitialState={InitialState} reducer={reducer}>
      <App/>
    </StateProvider>
  </Router>
);
